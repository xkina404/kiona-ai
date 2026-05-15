export abstract class BaseVoiceProvider {
  abstract name: string;
  abstract textToSpeech(text: string, options?: any): Promise<Buffer>;
  abstract speechToText(audio: Buffer, options?: any): Promise<string>;
}

export class ElevenLabsVoiceProvider extends BaseVoiceProvider {
  name = 'elevenlabs';
  private apiKey: string;
  private voiceId: string;

  constructor(apiKey: string = process.env.ELEVENLABS_API_KEY!, voiceId: string = '21m00Tcm4TlvDq8ikWAM') {
    super();
    this.apiKey = apiKey;
    this.voiceId = voiceId;
  }

  async textToSpeech(text: string): Promise<Buffer> {
    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${this.voiceId}`, {
      method: 'POST',
      headers: {
        'xi-api-key': this.apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) throw new Error('ElevenLabs request failed');
    const arrayBuffer = await response.arrayBuffer();
    return Buffer.from(arrayBuffer);
  }

  async speechToText(audio: Buffer): Promise<string> {
    // Use OpenAI Whisper API
    const formData = new FormData();
    formData.append('file', new Blob([audio], { type: 'audio/mpeg' }), 'audio.mp3');
    formData.append('model', 'whisper-1');

    const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: formData,
    });

    if (!response.ok) throw new Error('Whisper request failed');
    const data = await response.json();
    return data.text;
  }
}

export class GoogleVoiceProvider extends BaseVoiceProvider {
  name = 'google';
  private apiKey: string;

  constructor(apiKey: string = process.env.GOOGLE_CLOUD_TTS_KEY!) {
    super();
    this.apiKey = apiKey;
  }

  async textToSpeech(text: string): Promise<Buffer> {
    const response = await fetch(
      `https://texttospeech.googleapis.com/v1/text:synthesize?key=${this.apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          input: { text },
          voice: {
            languageCode: 'en-US',
            name: 'en-US-Neural2-C',
          },
          audioConfig: {
            audioEncoding: 'MP3',
          },
        }),
      }
    );

    if (!response.ok) throw new Error('Google TTS request failed');
    const data = await response.json();
    return Buffer.from(data.audioContent, 'base64');
  }

  async speechToText(audio: Buffer): Promise<string> {
    throw new Error('Google STT not implemented');
  }
}
