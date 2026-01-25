

export default async function retrieveNews(query = "finance") {

    const baseURL = import.meta.env.VITE_NEWSAPI_API_URL;
    const options = {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "X-Api-Key": import.meta.env.VITE_NEWSAPI_API_KEY
        }
    }


    const data = await fetch(`${baseURL}/everything?q=${encodeURIComponent(query)}&language=en&sortBy=publishedAt`, options)
        .then(response => {
            if (!response.ok) { throw new Error("Network response failed") }
            return response.json();
        });

    return data;

}