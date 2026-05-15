import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { getChatService } from '../services/chat.service';
import { validateRequest } from '../middleware/validation';

const router = Router();

const ChatMessageSchema = z.object({
  message: z.string().min(1),
  conversationId: z.string().optional(),
  mode: z.enum(['local', 'cloud', 'hybrid']).optional().default('hybrid'),
  model: z.string().optional(),
  stream: z.boolean().optional().default(false),
  context: z.array(z.any()).optional(),
});

type ChatMessage = z.infer<typeof ChatMessageSchema>;

// POST /api/chat/message
router.post('/message', validateRequest(ChatMessageSchema), async (req: Request, res: Response) => {
  try {
    const payload = req.body as ChatMessage;
    const chatService = await getChatService();
    
    const response = await chatService.processMessage({
      message: payload.message,
      conversationId: payload.conversationId,
      mode: payload.mode,
      model: payload.model,
      context: payload.context,
    });

    res.json(response);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// POST /api/chat/stream
router.post('/stream', validateRequest(ChatMessageSchema), async (req: Request, res: Response) => {
  try {
    const payload = req.body as ChatMessage;
    const chatService = await getChatService();

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    await chatService.streamMessage(
      {
        message: payload.message,
        conversationId: payload.conversationId,
        mode: payload.mode,
        model: payload.model,
        context: payload.context,
      },
      (chunk) => {
        res.write(`data: ${JSON.stringify(chunk)}\n\n`);
      }
    );

    res.end();
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// GET /api/chat/history/:conversationId
router.get('/history/:conversationId', async (req: Request, res: Response) => {
  try {
    const chatService = await getChatService();
    const history = await chatService.getHistory(req.params.conversationId);
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

export default router;