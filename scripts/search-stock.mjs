

export async function retrieveStockData(symbol) {
    const baseURL = import.meta.env.VITE_FINNHUB_API_URL;
    const options = {
        'Content-Type': 'application/json',
        "Accept": "application/json"
    }


    const data = await fetch(`${baseURL}/quote?symbol=${symbol}&token=${import.meta.env.VITE_FINNHUB_API_KEY}`, options)
        .then(response => {
            if (!response.ok) { throw new Error("Failed to fetch stock data") }
            return response.json();
        });

    return data;
}


export async function retrieveHistoricalStockData(symbol) {

    const baseURL = import.meta.env.VITE_POLYGON_API_URL;
    const options = {
        'Content-Type': 'application/json',
        "Accept": "application/json"
    }

    const data = await fetch(`${baseURL}/aggs/ticker/${symbol}/range/1/day/2025-11-26/2026-01-26?adjusted=true&sort=asc&limit=50000&apiKey=${import.meta.env.VITE_POLYGON_API_KEY}`, options)
        .then(response => {
            if (!response.ok) { throw new Error("Failed to fetch historical stock data") }
            return response.json();
        });

    return data;
}