'use client';

import { useState, useRef, useEffect } from 'react';
import { useChatStore } from '@/store/chat';
import { Send, Mic, Plus } from 'lucide-react';

export default function ChatInput() {
  const [input, setInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { sendMessage, loading } = useChatStore();

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    await sendMessage(input);
    setInput('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleVoiceInput = () => {
    setIsRecording(!isRecording);
    // TODO: Implement voice input
  };

  return (
    <div className="border-t border-slate-800 bg-slate-900 p-4 space-y-3">
      <div className="flex gap-2">
        <button
          onClick={handleVoiceInput}
          className={`p-3 rounded-lg transition ${
            isRecording
              ? 'bg-red-600 hover:bg-red-700'
              : 'bg-slate-700 hover:bg-slate-600'
          }`}
          title="Voice input"
        >
          <Mic size={20} />
        </button>
        <button
          className="p-3 rounded-lg bg-slate-700 hover:bg-slate-600 transition"
          title="Add tool"
        >
          <Plus size={20} />
        </button>
      </div>
      <div className="flex gap-2">
        <textarea
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message... (Shift+Enter for newline)"
          className="flex-1 bg-slate-800 border border-slate-700 rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none max-h-32"
          rows={3}
        />
        <button
          onClick={handleSend}
          disabled={loading || !input.trim()}
          className="px-4 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition flex items-center gap-2"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
}