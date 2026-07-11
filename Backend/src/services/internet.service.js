import { tavily } from "@tavily/core";

const tvly = tavily({ apiKey: process.env.TAVILY_API_KEY });

export async function searchOnInternet({ query }) {
    const results = await tvly.search(query, {
        maxResults: 5,
        searchDepth: "basic"
    });
    return JSON.stringify(results)
}
