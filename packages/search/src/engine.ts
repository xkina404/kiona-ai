export interface SearchResult {
  title: string;
  link: string;
  snippet: string;
  image?: string;
  source?: string;
}

export class SearchEngine {
  private apiKey: string;
  private engineId: string;
  private cache: Map<string, SearchResult[]> = new Map();

  constructor(
    apiKey: string = process.env.SEARCH_API_KEY!,
    engineId: string = process.env.SEARCH_ENGINE_ID!
  ) {
    this.apiKey = apiKey;
    this.engineId = engineId;
  }

  async search(query: string, limit: number = 10): Promise<SearchResult[]> {
    // Check cache
    if (this.cache.has(query)) {
      return this.cache.get(query)!;
    }

    try {
      const response = await fetch(
        `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(query)}&cx=${this.engineId}&key=${this.apiKey}&num=${limit}`
      );

      if (!response.ok) throw new Error('Search request failed');
      const data = await response.json();

      const results = (data.items || []).map((item: any) => ({
        title: item.title,
        link: item.link,
        snippet: item.snippet,
        image: item.pagemap?.cse_image?.[0]?.src,
        source: new URL(item.link).hostname,
      }));

      // Cache results
      this.cache.set(query, results);

      return results;
    } catch (error) {
      console.error('Search error:', error);
      return [];
    }
  }

  clearCache(): void {
    this.cache.clear();
  }
}
