# Setup Instructions for Kiona AI

## Prerequisites

- **Node.js**: v18 or higher
- **Python**: v3.10 or higher (for local models)
- **Ollama**: Download from https://ollama.ai
- **GPU**: Recommended for better local model performance

## Installation

### 1. Clone Repository

```bash
git clone https://github.com/xkina404/kiona-ai.git
cd kiona-ai
```

### 2. Install Dependencies

```bash
npm install
# or
pnpm install
```

### 3. Setup Environment Variables

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your API keys:

```env
# Required for cloud models
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
GEMINI_API_KEY=...
OPENROUTER_API_KEY=...

# Required for voice
ELEVENLABS_API_KEY=...

# Required for web search
SEARCH_API_KEY=...
SEARCH_ENGINE_ID=...

# Database (PostgreSQL)
DATABASE_URL=postgresql://user:password@localhost:5432/kiona_ai
```

### 4. Setup Database

```bash
# Using Docker
docker-compose up -d postgres redis

# Or setup manually
creatdb kiona_ai

# Run migrations
npm run db:setup
```

### 5. Setup Ollama (for local models)

```bash
# Install Ollama from https://ollama.ai
# Start Ollama service
ollama serve

# In another terminal, pull models
ollama pull llama2
ollama pull mistral
ollama pull neural-chat
```

## Running the Application

### Web UI

```bash
# Terminal 1: Start API server
npm run dev:api

# Terminal 2: Start Web UI
npm run dev:web

# Open http://localhost:3000
```

### Desktop App

```bash
# Terminal 1: Start API server
npm run dev:api

# Terminal 2: Start Desktop app
npm run dev:desktop
```

### Both simultaneously

```bash
npm run dev
```

## Configuration

### API Keys

You need to obtain API keys for cloud models:

1. **OpenAI** (GPT-4): https://platform.openai.com/api-keys
2. **Anthropic** (Claude): https://console.anthropic.com
3. **Google** (Gemini): https://makersuite.google.com/app/apikey
4. **OpenRouter**: https://openrouter.ai/keys
5. **ElevenLabs** (Voice): https://elevenlabs.io/api
6. **Google CSE** (Search): https://programmablesearchengine.google.com/

### Local Models

Ollama supports multiple local models:

- `llama2` - Fast and efficient (7B)
- `mistral` - Better quality (7B)
- `neural-chat` - Optimized for chat
- `dolphin-mixtral` - High quality (8x7B)
- `openchat` - Fast inference

Pull more models:

```bash
ollama pull <model-name>
```

## Architecture

### Project Structure

```
kiona-ai/
├── apps/
│   ├── api/          # Express.js Backend
│   ├── web/          # Next.js Web UI
│   └── desktop/      # Electron Desktop App
├── packages/
│   ├── core/         # AI Core Logic
│   ├── models/       # Model Providers
│   ├── avatar/       # Live2D Avatar
│   ├── voice/        # TTS & STT
│   ├── tools/        # Tools & Plugins
│   ├── search/       # Web Search
│   ├── rag/          # RAG System
│   └── ui-components/# Shared UI
├── scripts/          # Setup & Utils
├── docs/             # Documentation
└── docker/           # Docker Configs
```

### Technology Stack

**Frontend**
- Next.js 14+ (Web)
- React 18+ (Desktop)
- Tailwind CSS
- Framer Motion
- Zustand (State Management)

**Backend**
- Express.js
- TypeScript
- PostgreSQL
- Redis

**AI/ML**
- Ollama (Local Models)
- OpenRouter API (Cloud Models)
- Anthropic SDK
- Google AI SDK
- OpenAI SDK
- LangChain (RAG)
- Whisper (STT)
- ElevenLabs (TTS)

**Desktop**
- Electron 27+
- IPC for inter-process communication

## Development

### Adding a New Tool

```bash
npm run add-tool --name=my-tool --github-url=https://github.com/user/repo
```

### Running Tests

```bash
npm test
```

### Linting

```bash
npm run lint
```

### Format Code

```bash
npm run format
```

## Deployment

### Docker

```bash
npm run docker:build
npm run docker:up
```

### Production Build

```bash
npm run build
NODE_ENV=production npm start
```

### Desktop Distribution

```bash
npm run build:electron
```

Builds will be created in `dist/`:
- Windows: `.exe` installer and portable
- macOS: `.dmg` and `.zip`
- Linux: AppImage and `.deb`

## Troubleshooting

### Ollama Connection Issues

```bash
# Check if Ollama is running
curl http://localhost:11434/api/tags

# If not running, start it
ollama serve
```

### Port Already in Use

```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
APP_PORT=3001 npm run dev:api
```

### Database Connection Error

```bash
# Check PostgreSQL is running
psql -U postgres -c "SELECT version();"

# Or use Docker
docker-compose up -d postgres
```

### API Key Errors

- Verify all required API keys are in `.env.local`
- Check API key format and validity
- Ensure keys have proper permissions

## Support

- Documentation: https://github.com/xkina404/kiona-ai/wiki
- Issues: https://github.com/xkina404/kiona-ai/issues
- Discussions: https://github.com/xkina404/kiona-ai/discussions

## License

MIT License - See LICENSE file
