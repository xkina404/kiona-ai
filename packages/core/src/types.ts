export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  model?: string;
  metadata?: Record<string, any>;
}

export interface ConversationContext {
  conversationId: string;
  messages: Message[];
  mode: 'local' | 'cloud' | 'hybrid';
  currentModel: string;
}

export interface QueryOptions {
  mode?: 'local' | 'cloud' | 'hybrid';
  model?: string;
  temperature?: number;
  maxTokens?: number;
  stream?: boolean;
  context?: Message[];
  useRAG?: boolean;
  useSearch?: boolean;
}

export interface ModelResponse {
  text: string;
  model: string;
  tokensUsed?: number;
  latency?: number;
}

export interface Tool {
  name: string;
  description: string;
  execute: (input: any) => Promise<any>;
}

export interface RAGContext {
  documents: string[];
  similarity: number[];
  metadata: Record<string, any>[];
}