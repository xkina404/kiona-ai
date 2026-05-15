import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createLogger } from '../utils/logger';
import chatRoutes from '../routes/chat';
import modelsRoutes from '../routes/models';
import voiceRoutes from '../routes/voice';
import avatarRoutes from '../routes/avatar';
import toolsRoutes from '../routes/tools';
import searchRoutes from '../routes/search';

dotenv.config();

const app = express();
const logger = createLogger('API');
const PORT = process.env.APP_PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api/chat', chatRoutes);
app.use('/api/models', modelsRoutes);
app.use('/api/voice', voiceRoutes);
app.use('/api/avatar', avatarRoutes);
app.use('/api/tools', toolsRoutes);
app.use('/api/search', searchRoutes);

// Error handling
app.use((err: any, req: any, res: any, next: any) => {
  logger.error('Unhandled error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
    timestamp: new Date().toISOString(),
  });
});

// Start server
app.listen(PORT, () => {
  logger.info(`🚀 Server running on http://localhost:${PORT}`);
  logger.info(`Mode: ${process.env.APP_MODE || 'hybrid'}`);
});