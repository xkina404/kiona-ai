'use client';

import { useEffect, useState } from 'react';
import { useChatStore } from '@/store/chat';
import { useSettingsStore } from '@/store/settings';
import ChatInput from '@/components/ChatInput';
import ChatMessages from '@/components/ChatMessages';
import Avatar from '@/components/Avatar';
import Sidebar from '@/components/Sidebar';
import SettingsPanel from '@/components/SettingsPanel';

export default function ChatPage() {
  const [mounted, setMounted] = useState(false);
  const messages = useChatStore((state) => state.messages);
  const { showSettings, avatarVisible } = useSettingsStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex h-screen bg-slate-950 text-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="border-b border-slate-800 bg-slate-900/50 p-4">
          <h1 className="text-2xl font-bold">Kiona AI</h1>
          <p className="text-sm text-gray-400">Your AI Virtual Assistant</p>
        </div>

        {/* Chat Messages */}
        <ChatMessages messages={messages} />

        {/* Chat Input */}
        <ChatInput />
      </div>

      {/* Right Panel - Avatar or Settings */}
      <div className="w-80 border-l border-slate-800 bg-slate-900/50 overflow-hidden">
        {showSettings ? <SettingsPanel /> : avatarVisible && <Avatar />}
      </div>
    </div>
  );
}