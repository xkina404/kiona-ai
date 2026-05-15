import React, { useState, useEffect } from 'react';
import { useChatStore } from '../store/chat';
import { useSettingsStore } from '../store/settings';
import ChatInput from '../components/ChatInput';
import ChatMessages from '../components/ChatMessages';
import Sidebar from '../components/Sidebar';
import SettingsPanel from '../components/SettingsPanel';
import { Settings } from 'lucide-react';

declare global {
  interface Window {
    electron: any;
  }
}

export default function ChatPage() {
  const [showSettings, setShowSettings] = useState(false);
  const messages = useChatStore((state) => state.messages);
  const { showSettings: settingsOpen, toggleSettings } = useSettingsStore();

  const handleOpenAvatarWindow = async () => {
    if (window.electron?.avatar) {
      await window.electron.avatar.open();
    }
  };

  return (
    <div className="flex h-screen bg-slate-950 text-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="border-b border-slate-800 bg-slate-900/50 p-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Kiona AI</h1>
            <p className="text-sm text-gray-400">Desktop Version</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleOpenAvatarWindow}
              className="px-4 py-2 rounded bg-slate-700 hover:bg-slate-600 transition"
              title="Open floating avatar window"
            >
              Avatar Window
            </button>
            <button
              onClick={toggleSettings}
              className="p-2 rounded bg-slate-700 hover:bg-slate-600 transition"
            >
              <Settings size={20} />
            </button>
          </div>
        </div>

        {/* Chat Messages */}
        <ChatMessages messages={messages} />

        {/* Chat Input */}
        <ChatInput />
      </div>

      {/* Settings Panel */}
      {settingsOpen && (
        <div className="w-80 border-l border-slate-800 bg-slate-900/50 overflow-hidden">
          <SettingsPanel />
        </div>
      )}
    </div>
  );
}