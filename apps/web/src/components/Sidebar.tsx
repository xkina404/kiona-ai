'use client';

import { useChatStore } from '@/store/chat';
import { useSettingsStore } from '@/store/settings';
import { Settings, MessageSquare, Trash2, Plus } from 'lucide-react';

export default function Sidebar() {
  const { clearMessages } = useChatStore();
  const { toggleSettings } = useSettingsStore();

  return (
    <div className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-slate-800">
        <h1 className="text-xl font-bold">Kiona</h1>
        <p className="text-xs text-gray-400">AI Assistant</p>
      </div>

      {/* New Chat */}
      <div className="p-4">
        <button className="w-full flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition font-medium">
          <Plus size={20} />
          New Chat
        </button>
      </div>

      {/* Chat History */}
      <div className="flex-1 overflow-y-auto px-2 space-y-1">
        <div className="text-xs font-semibold text-gray-400 px-4 py-2">Today</div>
        {/* Placeholder chat items */}
        <div className="px-3 py-2 rounded hover:bg-slate-800 cursor-pointer text-sm truncate flex items-center gap-2">
          <MessageSquare size={16} />
          <span>What is AI?</span>
        </div>
        <div className="px-3 py-2 rounded hover:bg-slate-800 cursor-pointer text-sm truncate flex items-center gap-2">
          <MessageSquare size={16} />
          <span>How does machine learning work?</span>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="border-t border-slate-800 p-4 space-y-2">
        <button
          onClick={clearMessages}
          className="w-full flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 transition text-sm"
        >
          <Trash2 size={16} />
          Clear Chat
        </button>
        <button
          onClick={toggleSettings}
          className="w-full flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 transition text-sm"
        >
          <Settings size={16} />
          Settings
        </button>
      </div>
    </div>
  );
}