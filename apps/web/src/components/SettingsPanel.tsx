'use client';

import { useSettingsStore } from '@/store/settings';
import { Settings, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

interface Avatar {
  id: string;
  name: string;
  preview: string;
}

export default function SettingsPanel() {
  const [avatars, setAvatars] = useState<Avatar[]>([]);
  const [loading, setLoading] = useState(true);
  const { toggleSettings, avatarId, setAvatarId } = useSettingsStore();

  useEffect(() => {
    fetchAvatars();
  }, []);

  const fetchAvatars = async () => {
    try {
      const response = await axios.get(`${API_BASE}/api/avatar/list`);
      setAvatars(response.data);
    } catch (error) {
      console.error('Failed to fetch avatars:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col bg-slate-900">
      {/* Header */}
      <div className="border-b border-slate-800 p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Settings size={20} />
          <h2 className="font-bold">Settings</h2>
        </div>
        <button
          onClick={toggleSettings}
          className="p-1 hover:bg-slate-700 rounded transition"
        >
          <X size={20} />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Avatar Selection */}
        <div>
          <h3 className="font-semibold mb-3 text-sm">Avatar</h3>
          {loading ? (
            <p className="text-gray-400 text-sm">Loading avatars...</p>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              {avatars.map((avatar) => (
                <button
                  key={avatar.id}
                  onClick={() => setAvatarId(avatar.id)}
                  className={`p-3 rounded-lg text-center transition ${
                    avatarId === avatar.id
                      ? 'bg-blue-600 border-2 border-blue-400'
                      : 'bg-slate-700 border-2 border-transparent hover:border-slate-600'
                  }`}
                >
                  <img
                    src={avatar.preview}
                    alt={avatar.name}
                    className="w-full h-20 object-cover rounded mb-2"
                  />
                  <p className="text-xs font-medium truncate">{avatar.name}</p>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Model Selection */}
        <div>
          <h3 className="font-semibold mb-3 text-sm">Model Settings</h3>
          <div className="space-y-2">
            <label className="block">
              <span className="text-sm text-gray-300">Mode</span>
              <select className="w-full mt-1 bg-slate-800 border border-slate-700 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Hybrid (Smart routing)</option>
                <option>Local (Offline)</option>
                <option>Cloud (Premium)</option>
              </select>
            </label>
            <label className="block">
              <span className="text-sm text-gray-300">Model</span>
              <select className="w-full mt-1 bg-slate-800 border border-slate-700 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>GPT-4</option>
                <option>Claude 3</option>
                <option>Gemini Pro</option>
                <option>Llama 2</option>
                <option>Mistral</option>
              </select>
            </label>
          </div>
        </div>

        {/* Voice Settings */}
        <div>
          <h3 className="font-semibold mb-3 text-sm">Voice Settings</h3>
          <div className="space-y-2">
            <label className="block">
              <span className="text-sm text-gray-300">TTS Provider</span>
              <select className="w-full mt-1 bg-slate-800 border border-slate-700 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>ElevenLabs</option>
                <option>Google Cloud</option>
                <option>Azure</option>
              </select>
            </label>
            <label className="block">
              <span className="text-sm text-gray-300">Language</span>
              <select className="w-full mt-1 bg-slate-800 border border-slate-700 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>English (US)</option>
                <option>Indonesian</option>
                <option>Spanish</option>
                <option>French</option>
              </select>
            </label>
          </div>
        </div>

        {/* API Keys */}
        <div>
          <h3 className="font-semibold mb-3 text-sm">API Keys</h3>
          <p className="text-xs text-gray-400 mb-2">Manage your API keys securely</p>
          <button className="w-full py-2 px-3 bg-slate-700 hover:bg-slate-600 rounded text-sm transition">
            Configure API Keys
          </button>
        </div>
      </div>
    </div>
  );
}