import fs from "fs/promises";

// (fetch-news) runs on build time for application and creates a news json file. 
// Because: newsAPI rejects CORS requests.
const KEY = process.env.NEWSAPI_API_KEY;
if (!KEY) throw new Error("Set NEWSAPI_API_KEY in build environment");

const q = process.env.NEWS_QUERY || "finance";
const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(q)}&language=en&sortBy=publishedAt`;

const res = await fetch(url, { headers: { "X-Api-Key": KEY } });
if (!res.ok) throw new Error(`News fetch failed: ${res.status}`);
const body = await res.json();

// Write news data to json
await fs.mkdir("src/data", { recursive: true });
await fs.writeFile("src/data/news.json", JSON.stringify(body, null, 2));
