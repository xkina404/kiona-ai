export class AvatarService {
  private availableAvatars = [
    { id: 'default_v1', name: 'Default Avatar', preview: '/avatars/default.png' },
    { id: 'anime_v1', name: 'Anime Girl', preview: '/avatars/anime.png' },
    { id: 'chibi_v1', name: 'Chibi Style', preview: '/avatars/chibi.png' },
    { id: 'realistic_v1', name: 'Realistic', preview: '/avatars/realistic.png' },
  ];

  async getAvailableAvatars() {
    return this.availableAvatars;
  }

  async switchAvatar(avatarId: string): Promise<void> {
    const exists = this.availableAvatars.find(a => a.id === avatarId);
    if (!exists) {
      throw new Error(`Avatar ${avatarId} not found`);
    }
    // TODO: Update current avatar in database
  }

  async generateAnimation(text: string, audioUrl: string) {
    // TODO: Generate Live2D animation based on text and audio
    return {
      animations: [],
      duration: 0,
    };
  }
}

export function getAvatarService(): AvatarService {
  return new AvatarService();
}