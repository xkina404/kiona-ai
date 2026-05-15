import axios from 'axios';

export class SearchService {
  async search(query: string, options: { limit?: number } = {}) {
    try {
      const results = await axios.get('https://www.googleapis.com/customsearch/v1', {
        params: {
          q: query,
          cx: process.env.SEARCH_ENGINE_ID,
          key: process.env.SEARCH_API_KEY,
          num: options.limit || 10,
        },
      });

      return results.data.items.map((item: any) => ({
        title: item.title,
        link: item.link,
        snippet: item.snippet,
        image: item.pagemap?.cse_image?.[0]?.src,
      }));
    } catch (error) {
      throw new Error(`Search failed: ${(error as Error).message}`);
    }
  }

  async getHistory() {
    // TODO: Fetch search history from database
    return [];
  }
}

export function getSearchService(): SearchService {
  return new SearchService();
}