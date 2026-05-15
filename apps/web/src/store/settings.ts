'use client';

import { create } from 'zustand';

interface SettingsState {
  showSettings: boolean;
  avatarVisible: boolean;
  voiceEnabled: boolean;
  ttsProvider: string;
  sttLanguage: string;
  avatarId: string;
  
  toggleSettings: () => void;
  setAvatarVisible: (visible: boolean) => void;
  setVoiceEnabled: (enabled: boolean) => void;
  setTtsProvider: (provider: string) => void;
  setSttLanguage: (language: string) => void;
  setAvatarId: (id: string) => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  showSettings: false,
  avatarVisible: true,
  voiceEnabled: true,
  ttsProvider: 'elevenlabs',
  sttLanguage: 'en-US',
  avatarId: 'default_v1',

  toggleSettings: () =>
    set((state) => ({
      showSettings: !state.showSettings,
    })),

  setAvatarVisible: (visible) => set({ avatarVisible: visible }),
  setVoiceEnabled: (enabled) => set({ voiceEnabled: enabled }),
  setTtsProvider: (provider) => set({ ttsProvider: provider }),
  setSttLanguage: (language) => set({ sttLanguage: language }),
  setAvatarId: (id) => set({ avatarId: id }),
}));
