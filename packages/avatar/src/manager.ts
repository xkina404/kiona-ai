export interface AvatarConfig {
  id: string;
  name: string;
  modelPath: string;
  preview: string;
  animations?: string[];
}

export class AvatarManager {
  private currentAvatar: AvatarConfig | null = null;
  private canvas: HTMLCanvasElement | null = null;

  constructor(private avatarConfigs: AvatarConfig[]) {}

  async loadAvatar(avatarId: string, canvas: HTMLCanvasElement): Promise<void> {
    const config = this.avatarConfigs.find(a => a.id === avatarId);
    if (!config) throw new Error(`Avatar ${avatarId} not found`);

    this.currentAvatar = config;
    this.canvas = canvas;

    // TODO: Initialize Live2D with pixi.js
    // This will load the Live2D model from modelPath
  }

  async playAnimation(animationName: string, duration: number = 1000): Promise<void> {
    if (!this.currentAvatar) throw new Error('No avatar loaded');
    // TODO: Implement animation playback
  }

  async syncWithAudio(audioBuffer: AudioBuffer): Promise<void> {
    // TODO: Implement lip-sync and audio sync
  }

  async playIdleAnimation(): Promise<void> {
    await this.playAnimation('idle');
  }

  async playSpeakingAnimation(duration: number): Promise<void> {
    await this.playAnimation('speaking', duration);
  }

  getCurrentAvatar(): AvatarConfig | null {
    return this.currentAvatar;
  }
}

export const DEFAULT_AVATARS: AvatarConfig[] = [
  {
    id: 'default_v1',
    name: 'Default Avatar',
    modelPath: '/models/avatars/default/model.json',
    preview: '/avatars/default.png',
    animations: ['idle', 'speaking', 'happy', 'thinking'],
  },
  {
    id: 'anime_v1',
    name: 'Anime Girl',
    modelPath: '/models/avatars/anime/model.json',
    preview: '/avatars/anime.png',
    animations: ['idle', 'speaking', 'happy', 'shy'],
  },
  {
    id: 'chibi_v1',
    name: 'Chibi Style',
    modelPath: '/models/avatars/chibi/model.json',
    preview: '/avatars/chibi.png',
    animations: ['idle', 'speaking', 'excited', 'confused'],
  },
];
