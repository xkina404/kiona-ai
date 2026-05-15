'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  model?: string;
}

interface ChatMessagesProps {
  messages: ChatMessage[];
}

export default function ChatMessages({ messages }: ChatMessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.length === 0 ? (
        <div className="h-full flex items-center justify-center text-gray-400">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Welcome to Kiona AI</h2>
            <p>Start a conversation by typing a message or using voice input</p>
          </div>
        </div>
      ) : (
        messages.map((msg, idx) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                msg.role === 'user'
                  ? 'bg-blue-600 rounded-br-none'
                  : 'bg-slate-700 rounded-bl-none'
              }`}
            >
              <p className="text-sm">{msg.content}</p>
              {msg.model && (
                <p className="text-xs text-gray-300 mt-1">Model: {msg.model}</p>
              )}
            </div>
          </motion.div>
        ))
      )}
      <div ref={messagesEndRef} />
    </div>
  );
}