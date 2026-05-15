import { Router, Request, Response } from 'express';
import { getAvatarService } from '../services/avatar.service';

const router = Router();

// GET /api/avatar/list
router.get('/list', async (req: Request, res: Response) => {
  try {
    const avatarService = getAvatarService();
    const avatars = await avatarService.getAvailableAvatars();
    res.json(avatars);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// POST /api/avatar/switch
router.post('/switch', async (req: Request, res: Response) => {
  try {
    const { avatarId } = req.body;
    const avatarService = getAvatarService();
    await avatarService.switchAvatar(avatarId);
    res.json({ success: true, avatarId });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// POST /api/avatar/animate
router.post('/animate', async (req: Request, res: Response) => {
  try {
    const { text, audioUrl } = req.body;
    const avatarService = getAvatarService();
    const animation = await avatarService.generateAnimation(text, audioUrl);
    res.json(animation);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

export default router;