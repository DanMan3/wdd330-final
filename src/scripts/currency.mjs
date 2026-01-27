

export async function retrieveCurrencyExchangeRate() {

    const baseURL = import.meta.env.VITE_FRANKFURTE_API_URL
    const options = {
        'Content-Type': 'application/json',
        "Accept": "application/json"
    }

    const data = await fetch(`${baseURL}/latest?base=USD`, options)
        .then(response => {
            if (!response.ok) { throw new Error("Failed to fetch stock data") }
            return response.json();
        });

    return data;
}


export async function calculateStockExchangePrice(currentExchangePrices, stockInUSD) {

    if (!currentExchangePrices) {
        throw new Error("Missing exchange rate data");
    }

    // This will accept either the full API response { rates: { ... } } or a plain rates object
    const rates = currentExchangePrices.rates ?? currentExchangePrices;
    if (!rates || typeof stockInUSD !== "number") {
        return {};
    }

    const converted = {};
    // include USD as-is
    // converted.USD = Number(stockInUSD.toFixed(2));

    for (const [code, rate] of Object.entries(rates)) {
        const numericRate = Number(rate);
        if (Number.isFinite(numericRate)) {
            converted[code] = Number((stockInUSD * numericRate).toFixed(2));
        }
    }

    return converted;

}
