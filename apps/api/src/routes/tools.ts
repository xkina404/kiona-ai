import { Router, Request, Response } from 'express';
import { getToolService } from '../services/tool.service';

const router = Router();

// GET /api/tools
router.get('/', async (req: Request, res: Response) => {
  try {
    const toolService = getToolService();
    const tools = await toolService.getAvailableTools();
    res.json(tools);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// POST /api/tools/add
router.post('/add', async (req: Request, res: Response) => {
  try {
    const { name, githubUrl } = req.body;
    const toolService = getToolService();
    const tool = await toolService.addTool(name, githubUrl);
    res.json(tool);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// POST /api/tools/execute
router.post('/execute', async (req: Request, res: Response) => {
  try {
    const { toolName, input } = req.body;
    const toolService = getToolService();
    const result = await toolService.executeTool(toolName, input);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

export default router;