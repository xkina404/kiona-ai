# Kiona AI - API Documentation

## Base URL

```
http://localhost:3000/api
```

## Authentication

Not yet implemented. Plans for JWT authentication in v0.2.0.

## Chat Endpoints

### Send Message

```http
POST /chat/message
Content-Type: application/json

{
  "message": "Hello, how are you?",
  "conversationId": "abc123",
  "mode": "hybrid",
  "model": "gpt-4",
  "stream": false,
  "context": []
}
```

**Response:**

```json
{
  "id": "msg_123",
  "conversationId": "abc123",
  "message": "Hello, how are you?",
  "response": "I'm doing well, thank you for asking!",
  "model": "gpt-4",
  "mode": "cloud",
  "timestamp": "2024-05-15T10:30:00Z",
  "metadata": {
    "tokens": 42,
    "latency": 1250
  }
}
```

### Stream Message

```http
POST /chat/stream
Content-Type: application/json

{
  "message": "Write a poem",
  "conversationId": "abc123",
  "mode": "hybrid",
  "model": "gpt-4"
}
```

**Response:** Server-Sent Events (SSE)

```
data: {"type":"stream","content":"Once","model":"gpt-4"}
data: {"type":"stream","content":" upon","model":"gpt-4"}
data: {"type":"stream","content":" a","model":"gpt-4"}
...
```

### Get History

```http
GET /chat/history/:conversationId
```

**Response:**

```json
[
  {
    "id": "msg_1",
    "role": "user",
    "content": "Hello",
    "timestamp": "2024-05-15T10:00:00Z"
  },
  {
    "id": "msg_2",
    "role": "assistant",
    "content": "Hi there!",
    "timestamp": "2024-05-15T10:00:05Z",
    "model": "gpt-4"
  }
]
```

## Models Endpoints

### List Available Models

```http
GET /models
```

**Response:**

```json
{
  "local": [
    {
      "id": "llama2",
      "name": "Llama 2",
      "provider": "ollama",
      "size": "3.8GB",
      "quantization": "Q4"
    }
  ],
  "cloud": [
    {
      "id": "gpt-4",
      "name": "GPT-4",
      "provider": "openai"
    }
  ]
}
```

### Get Models Status

```http
GET /models/status
```

**Response:**

```json
{
  "local": {
    "status": "connected",
    "models": [...]
  },
  "cloud": {
    "openai": true,
    "anthropic": false,
    "gemini": true
  },
  "currentMode": "hybrid",
  "currentModel": "gpt-4"
}
```

### Switch Model

```http
POST /models/switch
Content-Type: application/json

{
  "model": "claude-3-opus",
  "mode": "cloud"
}
```

**Response:**

```json
{
  "success": true,
  "model": "claude-3-opus",
  "mode": "cloud"
}
```

## Voice Endpoints

### Text to Speech

```http
POST /voice/tts
Content-Type: application/json

{
  "text": "Hello world",
  "voice": "21m00Tcm4TlvDq8ikWAM",
  "language": "en-US",
  "speed": 1.0
}
```

**Response:** Audio file (audio/mpeg)

### Speech to Text

```http
POST /voice/stt
Content-Type: application/octet-stream

[binary audio data]
```

**Response:**

```json
{
  "text": "Hello world",
  "confidence": 0.95,
  "language": "en-US"
}
```

### Get Voice Settings

```http
GET /voice/settings
```

**Response:**

```json
{
  "ttsProvider": "elevenlabs",
  "voice": "21m00Tcm4TlvDq8ikWAM",
  "language": "en-US",
  "speed": 1.0
}
```

## Avatar Endpoints

### List Avatars

```http
GET /avatar/list
```

**Response:**

```json
[
  {
    "id": "default_v1",
    "name": "Default Avatar",
    "preview": "/avatars/default.png"
  }
]
```

### Switch Avatar

```http
POST /avatar/switch
Content-Type: application/json

{
  "avatarId": "anime_v1"
}
```

### Generate Animation

```http
POST /avatar/animate
Content-Type: application/json

{
  "text": "I'm happy to help!",
  "audioUrl": "https://example.com/audio.mp3"
}
```

## Tools Endpoints

### List Tools

```http
GET /tools
```

### Add Tool

```http
POST /tools/add
Content-Type: application/json

{
  "name": "microfish",
  "githubUrl": "https://github.com/user/microfish"
}
```

### Execute Tool

```http
POST /tools/execute
Content-Type: application/json

{
  "toolName": "microfish",
  "input": { ... }
}
```

## Search Endpoints

### Web Search

```http
POST /search
Content-Type: application/json

{
  "query": "latest AI news",
  "limit": 10
}
```

**Response:**

```json
[
  {
    "title": "AI Latest News",
    "link": "https://example.com/article",
    "snippet": "...",
    "image": "https://example.com/image.jpg"
  }
]
```

## Error Responses

### 400 Bad Request

```json
{
  "error": "Validation failed",
  "details": [...]
}
```

### 500 Internal Server Error

```json
{
  "error": "Internal Server Error",
  "timestamp": "2024-05-15T10:30:00Z"
}
```

## Rate Limiting

Not yet implemented. Planned for v0.2.0.

## WebSocket Support

Planned for v0.2.0 for real-time streaming and bi-directional communication.
