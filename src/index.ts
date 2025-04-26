import { client } from "./client/client.gen";
import type {
  SearchResponse,
  ExtractResponse,
  CreditResponse,
} from "./client/types.gen";

// Export client and types
export { client };
export type { SearchResponse, ExtractResponse, CreditResponse };

/**
 * Agent Toolkit Search API client
 */
export class AgentToolkit {
  /**
   * Initialize the Agent Toolkit client
   * @param apiKey Your Agent Toolkit API key
   * @param baseUrl Optional custom base URL
   */
  constructor(apiKey: string, baseUrl: string = "https://api.agenttoolkit.ai") {
    client.setConfig({
      baseUrl,
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": apiKey,
      },
    });
  }

  /**
   * Add response interceptor
   * @param callback Function to be called on each response
   */
  addResponseInterceptor(callback: (response: Response) => Response) {
    client.interceptors.response.use(callback);
  }

  /**
   * Search the web with the specified query
   * @param query Search query
   * @param options Search options
   * @returns Search results
   */
  async search(
    query: string,
    options: {
      maxResults?: number;
      provider?: "google" | "bing" | "duckduckgo";
      summarize?: boolean;
    } = {}
  ): Promise<SearchResponse> {
    const response = await client.get<SearchResponse>({
      url: "/api/v1/search",
      query: {
        query,
        max_results: options.maxResults || 5,
        provider: options.provider || "google",
        summarize: options.summarize === undefined ? false : options.summarize,
      },
    });

    if (!response.data) {
      throw new Error("No data received from search");
    }

    return response.data;
  }

  /**
   * Extract content from a URL
   * @param url URL to extract content from
   * @param options Extraction options
   * @returns Extracted content
   */
  async extract(
    url: string,
    options: {
      includeImages?: boolean;
      includeLinks?: boolean;
      extractDepth?: "basic" | "advanced";
    } = {}
  ): Promise<ExtractResponse> {
    const response = await client.get<ExtractResponse>({
      url: "/api/v1/extract",
      query: {
        url,
        include_images:
          options.includeImages === undefined ? true : options.includeImages,
        include_links:
          options.includeLinks === undefined ? true : options.includeLinks,
        extract_depth: options.extractDepth || "advanced",
      },
    });

    if (!response.data) {
      throw new Error("No content extracted");
    }

    return response.data;
  }

  /**
   * Get account credit information
   * @returns Credit usage details
   */
  async getCredits(): Promise<CreditResponse> {
    const response = await client.get<CreditResponse>({
      url: "/api/v1/credits",
    });

    if (!response.data) {
      throw new Error("No credit data received");
    }

    return response.data;
  }
}
