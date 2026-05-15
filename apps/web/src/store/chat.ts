'use client';

import { create } from 'zustand';
import axios from 'axios';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  model?: string;
  audioUrl?: string;
}

interface ChatState {
  messages: ChatMessage[];
  loading: boolean;
  currentModel: string;
  mode: 'local' | 'cloud' | 'hybrid';
  conversationId: string;
  
  addMessage: (message: ChatMessage) => void;
  clearMessages: () => void;
  setLoading: (loading: boolean) => void;
  setMode: (mode: 'local' | 'cloud' | 'hybrid') => void;
  setCurrentModel: (model: string) => void;
  sendMessage: (message: string) => Promise<void>;
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export const useChatStore = create<ChatState>((set, get) => ({
  messages: [],
  loading: false,
  currentModel: 'llama2',
  mode: 'hybrid',
  conversationId: Math.random().toString(36).substring(7),

  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),

  clearMessages: () => set({ messages: [] }),

  setLoading: (loading) => set({ loading }),

  setMode: (mode) => set({ mode }),

  setCurrentModel: (model) => set({ currentModel: model }),

  sendMessage: async (message: string) => {
    const state = get();
    
    // Add user message
    set((s) => ({
      messages: [
        ...s.messages,
        {
          id: Math.random().toString(36),
          role: 'user',
          content: message,
          timestamp: new Date().toISOString(),
        },
      ],
    }));

    set({ loading: true });

    try {
      const response = await axios.post(`${API_BASE}/api/chat/message`, {
        message,
        conversationId: state.conversationId,
        mode: state.mode,
        model: state.currentModel,
      });

      // Add assistant message
      set((s) => ({
        messages: [
          ...s.messages,
          {
            id: response.data.id,
            role: 'assistant',
            content: response.data.response,
            timestamp: response.data.timestamp,
            model: response.data.model,
          },
        ],
      }));
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      set({ loading: false });
    }
  },
}));
