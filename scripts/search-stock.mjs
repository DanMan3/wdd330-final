

export default async function retrieveStockData(symbol) {
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


// export default function retrieveHistoricalStockData() { }