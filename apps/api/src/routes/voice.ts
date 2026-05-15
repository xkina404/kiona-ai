import { Router, Request, Response } from 'express';
import { getVoiceService } from '../services/voice.service';

const router = Router();

// POST /api/voice/tts
router.post('/tts', async (req: Request, res: Response) => {
  try {
    const { text, voice, language, speed } = req.body;
    const voiceService = getVoiceService();
    const audio = await voiceService.textToSpeech(text, {
      voice,
      language,
      speed,
    });
    res.setHeader('Content-Type', 'audio/mpeg');
    res.send(audio);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// POST /api/voice/stt
router.post('/stt', async (req: Request, res: Response) => {
  try {
    const { audio, language } = req.body;
    const voiceService = getVoiceService();
    const text = await voiceService.speechToText(audio, { language });
    res.json({ text });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// GET /api/voice/settings
router.get('/settings', async (req: Request, res: Response) => {
  try {
    const voiceService = getVoiceService();
    const settings = await voiceService.getSettings();
    res.json(settings);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

export default router;