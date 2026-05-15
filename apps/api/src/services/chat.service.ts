import { v4 as uuidv4 } from 'uuid';
import { ModelService } from './model.service';
import { ToolService } from './tool.service';
import { SearchService } from './search.service';

interface ChatOptions {
  message: string;
  conversationId?: string;
  mode?: 'local' | 'cloud' | 'hybrid';
  model?: string;
  context?: any[];
}

interface ChatResponse {
  id: string;
  conversationId: string;
  message: string;
  response: string;
  model: string;
  mode: string;
  timestamp: string;
  metadata?: any;
}

export class ChatService {
  private modelService: ModelService;
  private toolService: ToolService;
  private searchService: SearchService;

  constructor(
    modelService: ModelService,
    toolService: ToolService,
    searchService: SearchService
  ) {
    this.modelService = modelService;
    this.toolService = toolService;
    this.searchService = searchService;
  }

  async processMessage(options: ChatOptions): Promise<ChatResponse> {
    const conversationId = options.conversationId || uuidv4();
    const mode = options.mode || 'hybrid';

    // Get current model
    const model = options.model || (await this.modelService.getCurrentModel());

    // Process with selected mode
    let response: string;
    if (mode === 'local') {
      response = await this.modelService.queryLocal(options.message, { model });
    } else if (mode === 'cloud') {
      response = await this.modelService.queryCloud(options.message, { model });
    } else {
      response = await this.modelService.queryHybrid(options.message, { model });
    }

    return {
      id: uuidv4(),
      conversationId,
      message: options.message,
      response,
      model,
      mode,
      timestamp: new Date().toISOString(),
    };
  }

  async streamMessage(
    options: ChatOptions,
    onChunk: (chunk: any) => void
  ): Promise<void> {
    const conversationId = options.conversationId || uuidv4();
    const mode = options.mode || 'hybrid';
    const model = options.model || (await this.modelService.getCurrentModel());

    if (mode === 'local') {
      await this.modelService.streamLocal(options.message, { model }, onChunk);
    } else if (mode === 'cloud') {
      await this.modelService.streamCloud(options.message, { model }, onChunk);
    } else {
      await this.modelService.streamHybrid(options.message, { model }, onChunk);
    }
  }

  async getHistory(conversationId: string): Promise<any[]> {
    // TODO: Fetch from database
    return [];
  }
}

let chatService: ChatService | null = null;

export async function getChatService(): Promise<ChatService> {
  if (!chatService) {
    const modelService = new ModelService();
    const toolService = new ToolService();
    const searchService = new SearchService();
    chatService = new ChatService(modelService, toolService, searchService);
  }
  return chatService;
}