import axios from 'axios';
import { Ollama } from 'ollama';

interface QueryOptions {
  model?: string;
  temperature?: number;
  maxTokens?: number;
}

export class ModelService {
  private currentMode: 'local' | 'cloud' = 'hybrid' as any;
  private currentModel: string = 'llama2';
  private ollama: Ollama;

  constructor() {
    this.ollama = new Ollama({
      host: process.env.OLLAMA_BASE_URL || 'http://localhost:11434',
    });
  }

  async getAvailableModels() {
    return {
      local: await this.getLocalModels(),
      cloud: this.getCloudModels(),
    };
  }

  private async getLocalModels() {
    try {
      const response = await this.ollama.list();
      return response.models.map((m: any) => ({
        id: m.name,
        name: m.name,
        provider: 'ollama',
        size: m.size,
        quantization: m.details?.quantization_level || 'unknown',
      }));
    } catch (error) {
      console.error('Error fetching local models:', error);
      return [];
    }
  }

  private getCloudModels() {
    return [
      {
        id: 'gpt-4',
        name: 'GPT-4',
        provider: 'openai',
      },
      {
        id: 'claude-3-opus',
        name: 'Claude 3 Opus',
        provider: 'anthropic',
      },
      {
        id: 'gemini-pro',
        name: 'Gemini Pro',
        provider: 'google',
      },
      {
        id: 'mistral-large',
        name: 'Mistral Large',
        provider: 'openrouter',
      },
    ];
  }

  async getCurrentModel(): Promise<string> {
    return this.currentModel;
  }

  async switchModel(model: string, mode: string): Promise<void> {
    this.currentModel = model;
    this.currentMode = mode as any;
  }

  async queryLocal(message: string, options: QueryOptions = {}): Promise<string> {
    try {
      const model = options.model || this.currentModel;
      const response = await this.ollama.generate({
        model,
        prompt: message,
        stream: false,
      });
      return response.response;
    } catch (error) {
      throw new Error(`Local model error: ${(error as Error).message}`);
    }
  }

  async queryCloud(message: string, options: QueryOptions = {}): Promise<string> {
    try {
      const model = options.model || 'gpt-4';

      // Route to appropriate provider
      if (model.includes('gpt')) {
        return await this.queryOpenAI(message, model);
      } else if (model.includes('claude')) {
        return await this.queryAnthropic(message, model);
      } else if (model.includes('gemini')) {
        return await this.queryGoogle(message, model);
      } else {
        return await this.queryOpenRouter(message, model);
      }
    } catch (error) {
      throw new Error(`Cloud model error: ${(error as Error).message}`);
    }
  }

  async queryHybrid(message: string, options: QueryOptions = {}): Promise<string> {
    // Simple hybrid: try local first, fallback to cloud
    try {
      return await this.queryLocal(message, options);
    } catch (error) {
      console.warn('Local model failed, trying cloud...');
      return await this.queryCloud(message, options);
    }
  }

  private async queryOpenAI(message: string, model: string): Promise<string> {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model,
      messages: [{ role: 'user', content: message }],
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
    });
    return response.data.choices[0].message.content;
  }

  private async queryAnthropic(message: string, model: string): Promise<string> {
    const response = await axios.post('https://api.anthropic.com/v1/messages', {
      model,
      max_tokens: 1024,
      messages: [{ role: 'user', content: message }],
    }, {
      headers: {
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
    });
    return response.data.content[0].text;
  }

  private async queryGoogle(message: string, model: string): Promise<string> {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
      {
        contents: [{
          parts: [{ text: message }],
        }],
      },
      {
        params: { key: process.env.GEMINI_API_KEY },
      }
    );
    return response.data.candidates[0].content.parts[0].text;
  }

  private async queryOpenRouter(message: string, model: string): Promise<string> {
    const response = await axios.post('https://openrouter.ai/api/v1/chat/completions', {
      model,
      messages: [{ role: 'user', content: message }],
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
      },
    });
    return response.data.choices[0].message.content;
  }

  async streamLocal(
    message: string,
    options: QueryOptions = {},
    onChunk: (chunk: any) => void
  ): Promise<void> {
    try {
      const model = options.model || this.currentModel;
      const response = await this.ollama.generate({
        model,
        prompt: message,
        stream: true,
      });

      for await (const chunk of response) {
        onChunk({
          type: 'stream',
          content: chunk.response,
        });
      }
    } catch (error) {
      throw new Error(`Stream error: ${(error as Error).message}`);
    }
  }

  async streamCloud(
    message: string,
    options: QueryOptions = {},
    onChunk: (chunk: any) => void
  ): Promise<void> {
    // TODO: Implement cloud streaming
  }

  async streamHybrid(
    message: string,
    options: QueryOptions = {},
    onChunk: (chunk: any) => void
  ): Promise<void> {
    // TODO: Implement hybrid streaming
  }

  async getStatus() {
    const localStatus = await this.getLocalStatus();
    const cloudStatus = this.getCloudStatus();

    return {
      local: localStatus,
      cloud: cloudStatus,
      currentMode: this.currentMode,
      currentModel: this.currentModel,
    };
  }

  private async getLocalStatus() {
    try {
      await this.ollama.list();
      return { status: 'connected', models: await this.getLocalModels() };
    } catch (error) {
      return { status: 'disconnected', error: (error as Error).message };
    }
  }

  private getCloudStatus() {
    return {
      openai: !!process.env.OPENAI_API_KEY,
      anthropic: !!process.env.ANTHROPIC_API_KEY,
      gemini: !!process.env.GEMINI_API_KEY,
      openrouter: !!process.env.OPENROUTER_API_KEY,
    };
  }
}

export function getModelService(): ModelService {
  return new ModelService();
}