import newsData from "../data/news.json";

// Retreive data from news json file
export default async function retrieveNews(query = "finance") {
    if (!newsData || !newsData.articles) return { articles: [] };
    if (!query || query === "finance") return newsData;
    const q = query.toLowerCase();
    return {
        ...newsData,
        articles: newsData.articles.filter(a =>
            (a.title || "").toLowerCase().includes(q) ||
            (a.description || "").toLowerCase().includes(q)
        )
    };
}