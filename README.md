# @agenttoolkit/search

A TypeScript client for the Agent Toolkit Search API that enables web search and content extraction.

## Installation

```bash
npm install @agenttoolkit/search
```

## Usage

### Initialize the client

```typescript
import { AgentToolkit } from "@agenttoolkit/search";

// Initialize with your API key
const atk = new AgentToolkit("your-api-key");
```

### Search the web

```typescript
const results = await atk.search("typescript openapi client", {
  maxResults: 5, // Default: 5
  provider: "google", // Options: 'google', 'bing', 'duckduckgo'
  summarize: true, // Get AI-generated summary of results
});

// Access search results
console.log(`Found ${results.results.length} results`);
console.log(`First result: ${results.results[0]?.title}`);

// Access summary if requested
if (results.summary) {
  console.log(`Summary: ${results.summary}`);
}
```

### Extract content from a URL

```typescript
const extracted = await atk.extract("https://example.com", {
  includeImages: true, // Default: true
  includeLinks: true, // Default: true
  extractDepth: "advanced", // Options: 'basic', 'advanced'
});

// Access extracted content
if (extracted.results && extracted.results.length > 0) {
  const content = extracted.results[0];
  console.log(`Content: ${content.raw_content}`);
  console.log(`Images: ${content.images?.length || 0}`);
  console.log(`Links: ${content.links?.length || 0}`);
}
```

### Check account credits

```typescript
const credits = await atk.getCredits();
console.log(`Total credits: ${credits.total_credits}`);
console.log(`Used credits: ${credits.used_credits}`);
console.log(`Remaining: ${credits.remaining_credits}`);
```

### Add response interceptors

```typescript
// Add a response interceptor for logging or other purposes
atk.addResponseInterceptor((response) => {
  console.log(`Request to ${response.url} returned status ${response.status}`);
  return response;
});
```

## API Reference

For complete API documentation, see the [Agent Toolkit Documentation](https://docs.agenttoolkit.ai).

## License

MIT
