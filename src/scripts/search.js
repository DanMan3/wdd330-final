import navInit from "./navigation.mjs";
import footerInit from "./dates.mjs";
import { retrieveStockData, retrieveHistoricalStockData } from "./search-stock.mjs";
import { retrieveCurrencyExchangeRate, calculateStockExchangePrice } from "./currency.mjs";



function renderStockData(stockInfo, ticker) {
    const stockTicker = document.getElementById("ticker");
    stockTicker.textContent = ticker;

    const current = document.getElementById("current");
    current.textContent = `${stockInfo.c}`;

    const timestamp = document.getElementById("timestamp");
    const dt = new Date(stockInfo.t * 1000);
    const fmt = new Intl.DateTimeFormat(undefined, {
        timeZone: "America/New_York",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit"
    });
    timestamp.textContent = fmt.format(dt);

    const high = document.getElementById("high");
    high.textContent = `High: ${stockInfo.h}`;

    const low = document.getElementById("low");
    low.textContent = `Low: ${stockInfo.l}`;

    const opening = document.getElementById("opening");
    opening.textContent = `Open: ${stockInfo.o}`;

    const prevClose = document.getElementById("prev-close");
    prevClose.textContent = `Prev Close: ${stockInfo.pc}`;

}


function renderHistoricStockData(stockData) {

    console.log(stockData);
}


function renderCurrencyExchangeRates(exchanges) {

    console.log(exchanges);

}



document.addEventListener("DOMContentLoaded", async () => {
    navInit();
    footerInit();

    const userInput = "AAPL";

    try {
        const stockInfo = await retrieveStockData(userInput);
        renderStockData(stockInfo, userInput);

        const data = await retrieveHistoricalStockData(userInput);
        renderHistoricStockData(data);

        const exchangeRates = await retrieveCurrencyExchangeRate();
        const exchanges = await calculateStockExchangePrice(exchangeRates, stockInfo.c);
        renderCurrencyExchangeRates(exchanges);

    } catch (err) {
        console.error(err);
    }
});