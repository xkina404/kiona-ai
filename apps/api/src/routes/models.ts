import { Router, Request, Response } from 'express';
import { getModelService } from '../services/model.service';

const router = Router();

// GET /api/models
router.get('/', async (req: Request, res: Response) => {
  try {
    const modelService = getModelService();
    const models = await modelService.getAvailableModels();
    res.json(models);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// GET /api/models/status
router.get('/status', async (req: Request, res: Response) => {
  try {
    const modelService = getModelService();
    const status = await modelService.getStatus();
    res.json(status);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// POST /api/models/switch
router.post('/switch', async (req: Request, res: Response) => {
  try {
    const { model, mode } = req.body;
    const modelService = getModelService();
    await modelService.switchModel(model, mode);
    res.json({ success: true, model, mode });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

export default router;