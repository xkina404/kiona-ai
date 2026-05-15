# Architecture Documentation

## System Overview

Kiona AI is built as a modular, multi-tier application supporting both local and cloud AI models.

```
┌─────────────────────────────────────────────────────────┐
│                    Frontend Layer                        │
│  ┌──────────────────┐  ┌──────────────────────────────┐ │
│  │   Web UI (Next)  │  │  Desktop UI (Electron)       │ │
│  │  - Chat          │  │  - Floating Avatar           │ │
│  │  - Settings      │  │  - Voice Input               │ │
│  │  - Avatar        │  │  - Always-on-top Support     │ │
│  └──────────────────┘  └──────────────────────────────┘ │
└──────────────────────────┬──────────────────────────────┘
                           │ HTTP/WebSocket
┌──────────────────────────▼──────────────────────────────┐
│                   API Server (Express)                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │ Chat Routes  │  │ Voice Routes │  │ Avatar Route │  │
│  ├──────────────┤  ├──────────────┤  ├──────────────┤  │
│  │ Models Route │  │ Tools Routes │  │ Search Route │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└──────────────────────────┬──────────────────────────────┘
                           │
       ┌───────────────────┼───────────────────┐
       │                   │                   │
       ▼                   ▼                   ▼
┌────────────┐        ┌──────────┐    ┌──────────────┐
│Local Models│        │Cloud APIs│    │Data Layer    │
│(Ollama)    │        │- OpenAI  │    │- PostgreSQL  │
│- Llama 2   │        │- Claude  │    │- Redis Cache │
│- Mistral   │        │- Gemini  │    │- File Storage│
│- Phi       │        │- Custom  │    └──────────────┘
└────────────┘        └──────────┘
```

## Core Components

### 1. Chat Service
- Handles message processing
- Routes to appropriate model based on mode
- Manages conversation context
- Supports streaming responses

### 2. Model Service
- Manages local (Ollama) models
- Manages cloud API integrations
- Provides model switching
- Implements hybrid mode routing

### 3. Voice Service
- Text-to-Speech (TTS) with ElevenLabs
- Speech-to-Text (STT) with Whisper
- Audio synchronization

### 4. Avatar Service
- Live2D avatar rendering
- Animation sync with text/audio
- Avatar customization

### 5. Tools Service
- Dynamic tool loading
- Function calling support
- Tool execution

### 6. Search Service
- Web search integration
- Result caching
- Source tracking

### 7. RAG Service
- Document ingestion
- Embedding generation
- Semantic search
- Context augmentation

## Data Flow

### Chat Message Processing

```
User Input
    │
    ▼
┌─────────────────────┐
│ Validate & Parse    │
└──────────┬──────────┘
           │
    ┌──────▼──────┐
    │ Check Mode  │
    └──┬──────┬───┘
       │      │
   LOCAL  CLOUD  HYBRID
       │      │      │
       └──┬───┘      │
          │         │
    ┌─────▼──────────▼─────┐
    │ Format & Prepare     │
    │ Query w/ Context     │
    └──────────┬───────────┘
               │
       ┌───────▼────────┐
       │ Get RAG Context│ (if enabled)
       └───────┬────────┘
               │
       ┌───────▼────────┐
       │ Web Search     │ (if enabled)
       └───────┬────────┘
               │
       ┌───────▼────────┐
       │ Call Model API │
       └───────┬────────┘
               │
       ┌───────▼────────┐
       │ Stream/Return  │
       │ Response       │
       └───────┬────────┘
               │
       ┌───────▼────────┐
       │ Generate Voice │ (if enabled)
       └───────┬────────┘
               │
       ┌───────▼────────┐
       │ Animate Avatar │
       └───────┬────────┘
               │
        Return to User
```

## Mode Selection

### Local Mode
- All processing on user's machine
- Requires Ollama + downloaded models
- Offline capable
- Privacy-focused
- Lower latency (on good hardware)

### Cloud Mode
- Uses cloud APIs (OpenAI, Anthropic, Google, etc.)
- Higher quality responses
- Requires API keys
- Internet required
- Usage costs apply

### Hybrid Mode (Smart Routing)
- Intelligently selects between local/cloud
- Factors:
  - Query complexity
  - Model availability
  - User preferences
  - Cost optimization
  - Latency requirements

## State Management

### Zustand Stores (Frontend)

**Chat Store**
- Current messages
- Conversation ID
- Loading state
- Current model/mode

**Settings Store**
- UI preferences
- Voice settings
- Avatar selection
- API keys

### Backend State
- Redis cache for sessions
- PostgreSQL for persistence
- In-memory model cache

## Scaling Considerations

### Horizontal Scaling
- Multiple API server instances
- Load balancing with Nginx
- Redis cluster for caching
- PostgreSQL replication

### Performance Optimization
- Response streaming
- Message pagination
- Model caching
- Query optimization
- CDN for static assets

## Security

### Frontend Security
- API key encryption
- Secure storage
- HTTPS only
- CORS configuration

### Backend Security
- Input validation
- Rate limiting
- JWT authentication
- Database encryption
- Environment variable management

### Data Privacy
- End-to-end encryption (optional)
- On-device processing (local mode)
- No data persistence (configurable)
- GDPR compliance

## Extension Points

### Adding New Models

```typescript
// In packages/models/src/providers
export class NewModelProvider implements IModelProvider {
  async query(prompt: string): Promise<string> {
    // Implementation
  }
}
```

### Adding New Tools

```typescript
// In packages/tools/src
export class NewTool implements ITool {
  async execute(input: any): Promise<any> {
    // Implementation
  }
}
```

### Adding Voice Providers

```typescript
// In packages/voice/src
export class NewVoiceProvider implements IVoiceProvider {
  async textToSpeech(text: string): Promise<Buffer> {
    // Implementation
  }
}
```

## Deployment Architecture

### Development
```
Localhost:3000 (API)
Localhost:3001 (Web)
Localhost:11434 (Ollama)
```

### Production
```
┌─────────────┐
│   Client    │
└──────┬──────┘
       │ HTTPS
       ▼
┌─────────────────────────┐
│   CloudFlare/Nginx      │ (CDN & Load Balancer)
└──────┬──────────────────┘
       │
   ┌───┴───┐
   ▼       ▼
┌──────┐ ┌──────┐  (Multiple instances)
│ API1 │ │ API2 │
└───┬──┘ └───┬──┘
    │        │
    └───┬────┘
        ▼
    ┌────────────────┐
    │  PostgreSQL    │
    │  (Replicated)  │
    └────────────────┘
        │
        ├─► Redis Cluster (Cache)
        ├─► S3 (File Storage)
        └─► Ollama Service (GPU)
```
