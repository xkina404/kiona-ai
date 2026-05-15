import { Router, Request, Response } from 'express';
import { getSearchService } from '../services/search.service';

const router = Router();

// POST /api/search
router.post('/', async (req: Request, res: Response) => {
  try {
    const { query, limit } = req.body;
    const searchService = getSearchService();
    const results = await searchService.search(query, { limit: limit || 10 });
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// GET /api/search/history
router.get('/history', async (req: Request, res: Response) => {
  try {
    const searchService = getSearchService();
    const history = await searchService.getHistory();
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

export default router;