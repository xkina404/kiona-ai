# Kiona AI - AI Virtual Assistant Platform

AI Virtual Assistant dengan dual mode (local & cloud), Live2D avatar, voice integration, dan game support (Minecraft).

## 🎯 Fitur Utama

### Model & AI
- **Dual Mode**: Local (Ollama) & Cloud (OpenRouter, Gemini, Claude, ChatGPT)
- **Web Search**: Real-time information retrieval
- **RAG (Retrieval Augmented Generation)**: Konteks dari dokumen custom
- **Local Models**: Llama 2, Mistral, Phi, dan lainnya
- **Cloud Models**: Claude 3, GPT-4, Gemini Pro via OpenRouter

### Avatar & Voice
- **Live2D Avatar**: Interactive avatar dengan sync gerakan
- **Text-to-Speech (TTS)**: Suara natural dengan sinkronisasi avatar
- **Speech-to-Text (STT)**: Voice input dengan real-time transcription
- **Avatar Customization**: Pilih berbagai avatar

### UI & Interface
- **Web UI**: Mirip DeepSeek/Claude/Gemini dengan dark mode
- **Desktop UI**: ElectronJS dengan avatar terpisah/gabung dengan chat
- **Settings Panel**: Toggle local/cloud, model selection, voice settings
- **Responsive Design**: Mobile & Desktop friendly

### Game Integration
- **Minecraft Support**: Local & cloud model bisa main Minecraft
- **Tool Integration**: GitHub tools (MicroFish dll) dapat ditambahkan

### Tools & Extensions
- **Dynamic Tool Loading**: Tambah tools dari GitHub
- **Function Calling**: Model dapat memanggil tools
- **Web Search API**: Integration dengan search engines
- **Custom Tools**: Buat tool custom sendiri

## 📁 Project Structure

```
kiona-ai/
├── apps/
│   ├── web/                    # Next.js Web UI
│   ├── desktop/                # Electron Desktop App
│   └── api/                    # Backend Server
├── packages/
│   ├── core/                   # AI Core Logic
│   ├── models/                 # Model Providers
│   ├── avatar/                 # Live2D Avatar System
│   ├── voice/                  # TTS & STT
│   ├── tools/                  # Tools & Plugins
│   ├── search/                 # Web Search
│   ├── rag/                    # RAG System
│   └── ui-components/          # Shared UI Components
├── scripts/                    # Setup & utility scripts
├── docs/                       # Documentation
└── docker/                     # Docker configs
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Python 3.10+
- Ollama (untuk local models)
- GPU (recommended untuk local models)

### Installation

```bash
# Clone & setup
git clone https://github.com/xkina404/kiona-ai.git
cd kiona-ai

# Install dependencies
npm install
# or
pnpm install

# Setup environment
cp .env.example .env.local
# Edit .env.local dengan API keys Anda

# Setup database
npm run db:setup

# Start development
npm run dev
```

## ⚙️ Configuration

### Environment Variables

```env
# Cloud Models
OPENROUTER_API_KEY=your_key
GEMINI_API_KEY=your_key
ANTHROPIC_API_KEY=your_key
OPENAI_API_KEY=your_key

# Local Models (Ollama)
OLLAMA_BASE_URL=http://localhost:11434

# Web Search
SEARCH_API_KEY=your_key
SEARCH_ENGINE_ID=your_id

# Voice (ElevenLabs, Google Cloud, etc)
ELEVENLABS_API_KEY=your_key
GOOGLE_CLOUD_TTS_KEY=your_key

# Database
DATABASE_URL=postgresql://...

# App Settings
APP_MODE=hybrid # hybrid | local | cloud
DEFAULT_VOICE=en_US
DEFAULT_AVATAR=default_v1
```

## 📦 Technologies

### Frontend
- **Web**: Next.js 14+, React 18+, Tailwind CSS
- **Desktop**: Electron, React
- **UI**: Shadcn/ui, Framer Motion
- **Avatar**: Pixi.js, Live2D SDK

### Backend
- **Runtime**: Node.js + Express
- **Python**: FastAPI (untuk ML models)
- **Database**: PostgreSQL + Redis
- **Message Queue**: Bull (BullMQ)

### AI & ML
- **Local**: Ollama, LLaMA.cpp, llama-node
- **Cloud**: OpenRouter API, Anthropic, Google AI, OpenAI
- **Embeddings**: Sentence Transformers, OpenAI Embeddings
- **RAG**: LangChain, Llamaindex
- **Voice**: Whisper (STT), ElevenLabs (TTS)

### Game Integration
- **Minecraft**: mineflayer, minecraft-protocol
- **API**: Minecraft server integration

## 🎮 Dual Mode Architecture

### Local Mode
```
User Input → Web/Desktop UI → Local API Server
           → Ollama Models → Response
           → TTS (Local/Cloud) → Audio
           → Avatar Animation
```

### Cloud Mode
```
User Input → Web/Desktop UI → API Server
           → Cloud API (OpenRouter/Gemini/Claude/ChatGPT)
           → Response → TTS → Audio → Avatar Animation
```

### Hybrid Mode
```
Intelligent routing berdasarkan:
- Query complexity
- Model availability
- User preferences
- Cost optimization
```

## 📖 Documentation

- [Setup Guide](./docs/setup.md)
- [API Documentation](./docs/api.md)
- [Architecture](./docs/architecture.md)
- [Contributing](./CONTRIBUTING.md)
- [Deployment](./docs/deployment.md)

## 🚢 Deployment

### Docker
```bash
npm run docker:build
npm run docker:up
```

### Production
```bash
npm run build
npm run start:prod
```

## 📝 Roadmap

- [ ] Multi-turn conversations optimization
- [ ] Voice cloning support
- [ ] Advanced RAG dengan reranking
- [ ] More game integrations
- [ ] Plugin marketplace
- [ ] Mobile app (React Native)
- [ ] Voice call support
- [ ] Vision models support
- [ ] Real-time collaboration
- [ ] Analytics & insights

## 🤝 Contributing

Contributions welcome! Lihat [CONTRIBUTING.md](./CONTRIBUTING.md)

## 📄 License

MIT License - see [LICENSE](./LICENSE) file

## 🆘 Support

- Issues: [GitHub Issues](https://github.com/xkina404/kiona-ai/issues)
- Discussions: [GitHub Discussions](https://github.com/xkina404/kiona-ai/discussions)
- Documentation: [https://kiona-ai.dev](https://kiona-ai.dev)
- donation      : [https://ko-fi.com/xkina404/goal?g=0](https://ko-fi.com/xkina404/goal?g=0)
---

**Made with ❤️ by xkina404**
