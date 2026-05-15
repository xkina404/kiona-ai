import axios from 'axios';

interface VoiceOptions {
  voice?: string;
  language?: string;
  speed?: number;
}

export class VoiceService {
  async textToSpeech(text: string, options: VoiceOptions = {}): Promise<Buffer> {
    const provider = process.env.TTS_PROVIDER || 'elevenlabs';

    if (provider === 'elevenlabs') {
      return await this.elevenLabsTTS(text, options);
    } else if (provider === 'google') {
      return await this.googleTTS(text, options);
    }

    throw new Error(`Unknown TTS provider: ${provider}`);
  }

  private async elevenLabsTTS(text: string, options: VoiceOptions = {}): Promise<Buffer> {
    const voiceId = options.voice || process.env.TTS_VOICE || '21m00Tcm4TlvDq8ikWAM';

    const response = await axios.post(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
      { text },
      {
        headers: {
          'xi-api-key': process.env.ELEVENLABS_API_KEY,
        },
        responseType: 'arraybuffer',
      }
    );

    return Buffer.from(response.data);
  }

  private async googleTTS(text: string, options: VoiceOptions = {}): Promise<Buffer> {
    // TODO: Implement Google Cloud TTS
    throw new Error('Google TTS not yet implemented');
  }

  async speechToText(audio: Buffer, options: VoiceOptions = {}): Promise<string> {
    // TODO: Implement STT with Whisper
    return '';
  }

  async getSettings() {
    return {
      ttsProvider: process.env.TTS_PROVIDER || 'elevenlabs',
      voice: process.env.TTS_VOICE || '21m00Tcm4TlvDq8ikWAM',
      language: process.env.TTS_LANGUAGE || 'en-US',
      speed: 1.0,
    };
  }
}

export function getVoiceService(): VoiceService {
  return new VoiceService();
}