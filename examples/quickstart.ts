import { client } from "../src/client/client.gen";
import type { SearchResponse, ExtractResponse } from "../src/client/types.gen";

// Set up the client
client.setConfig({
  baseUrl: "https://api.agenttoolkit.ai",
  headers: {
    "Content-Type": "application/json",
    "X-API-Key": "API_KEY_HERE", // Replace with your actual API key
  },
});

async function searchAndExtract() {
  try {
    // 1. Perform a search
    console.log("Searching for 'typescript openapi'...");
    const searchResponse = await client.get<SearchResponse>({
      url: "/api/v1/search",
      query: {
        query: "typescript openapi",
        max_results: 3,
        provider: "google",
        summarize: true,
      },
    });

    // 2. Show search results
    console.log("\n=== SEARCH RESULTS ===");
    if (searchResponse.data?.results) {
      searchResponse.data.results.forEach((result, i) => {
        console.log(`\n${i + 1}. ${result.title}`);
        console.log(`   URL: ${result.url}`);
        console.log(`   ${result.snippet}`);
      });

      if (searchResponse.data.summary) {
        console.log(`\nSummary: ${searchResponse.data.summary}`);
      }
    }

    // 3. Extract content from the first result URL
    if (searchResponse.data?.results?.[0]) {
      const url = searchResponse.data.results[0].url;
      console.log(`\n\nExtracting content from ${url}...`);

      const extractResponse = await client.get<ExtractResponse>({
        url: "/api/v1/extract",
        query: {
          url,
          include_images: true,
          include_links: true,
          extract_depth: "advanced",
        },
      });

      // 4. Show extracted content
      console.log("\n=== EXTRACTED CONTENT ===");
      if (extractResponse.data?.results?.[0]) {
        const result = extractResponse.data.results[0];
        console.log(
          `\nContent Preview: ${result.raw_content.slice(0, 150)}...`
        );
        console.log(`Images: ${result.images?.length || 0}`);
        console.log(`Links: ${result.links?.length || 0}`);
      } else {
        console.log("No content extracted");
      }
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

// Run the example
searchAndExtract();
