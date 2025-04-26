# Agent Toolkit - Quick Start

## Setup

```bash
# Install
npm install @agent-toolkit/client-ts

# Configure API key in your code
client.setConfig({
  baseUrl: "https://api.agenttoolkit.ai",
  headers: {
    "Content-Type": "application/json",
    "X-API-Key": "YOUR_API_KEY",
  },
});
```

## Usage Examples

### Web Search

```typescript
const response = await client.get({
  url: "/api/v1/search",
  query: {
    query: "search term",
    max_results: 5,
    provider: "google",
    summarize: true,
  },
});
```

### Content Extraction

```typescript
const response = await client.get({
  url: "/api/v1/extract",
  query: {
    url: "https://example.com",
    include_images: true,
    include_links: true,
  },
});
```

### Try the CLI

```bash
# Show all commands
npm run start

# Search example
npm run start -- search "typescript" --max=3

# Extract example
npm run start -- extract "https://example.com"
```

## Run the full demo

```bash
npm run example
```
