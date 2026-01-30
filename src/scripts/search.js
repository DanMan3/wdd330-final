import navInit from "./navigation.mjs";
import footerInit from "./dates.mjs";
import { retrieveStockData, retrieveHistoricalStockData } from "./search-stock.mjs";
import { pinStock, renderPinnedStocks } from "./pin-stock.mjs";



function renderStockData(stockInfo, ticker) {
    const stockTicker = document.getElementById("ticker");
    stockTicker.textContent = ticker;

    const tickerWithPin = document.getElementById("ticker-with-pin");
    // remove any existing pin buttons so we don't duplicate on each render
    tickerWithPin.querySelectorAll("button").forEach(b => b.remove());
    const pinButton = document.createElement("button");
    pinButton.textContent = "📌";
    pinButton.addEventListener("click", (e) => {
        e.preventDefault();

        // Pin stock when the button is clicked
        pinStock(String(ticker).toUpperCase());
        renderPinnedStocks();
    });



    tickerWithPin.appendChild(pinButton);

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

    const current = document.getElementById("current");
    const currentVal = Number(stockInfo.c);
    current.textContent = `${stockInfo.c}`;



    const prevCloseVal = Number(stockInfo.pc);
    let change = null;
    let changePct = null;

    if (Number.isFinite(prevCloseVal) && Number.isFinite(currentVal)) {
        change = Number((currentVal - prevCloseVal).toFixed(2));
        changePct = prevCloseVal !== 0 ? Number(((change / prevCloseVal) * 100).toFixed(2)) : null;
    }

    const sign = change > 0 ? "+" : "";
    const changeText = change !== null ? `${sign}${change}` : "—";
    const changePctText = changePct !== null ? `${sign}${changePct}%` : "—";

    const changeEl = document.getElementById("change");
    changeEl.textContent = `${changeText} (${changePctText})`;


    // Color if positive or negative on the day
    if (currentVal >= Number(stockInfo.pc)) {
        current.style.color = "#037b4b";
        changeEl.style.color = "#037b4b";
    } else {
        current.style.color = "#d60a22";
        changeEl.style.color = "#d60a22";
    }


}


function renderHistoricStockData(stockData) {

    const table = document.getElementById("historical-info-table-body");


    // Reset table HTML to null each time a new stock is searched.
    table.innerHTML = "";

    // Iterate through stockData in reverse
    for (let idx = stockData.length - 1; idx >= 0; idx--) {
        const i = stockData[idx];

        // Date converted from Unix time into ET
        const dt = new Date(i.t);
        const fmtDate = new Intl.DateTimeFormat(undefined, {
            timeZone: "America/New_York",
            year: "numeric",
            month: "short",
            day: "numeric"
        }).format(dt);

        // Change and Change Percentage calculated
        const prevClose = (idx > 0 && Number.isFinite(Number(stockData[idx - 1]?.c))) ? Number(stockData[idx - 1].c) : null;


        let change = null;
        let changePct = null;
        change = Number((Number(i.c) - prevClose).toFixed(2));
        changePct = Number(((change / prevClose) * 100).toFixed(2));

        // Volume formatted to add proper commas
        const vol = Number(i.v);
        const formattedVol = Number.isFinite(vol) ? vol.toLocaleString() : i.v;



        const tableRow = document.createElement("tr");
        tableRow.innerHTML = `<td class="date">${fmtDate}</td>
                              <td class="close">${i.c}</td>
                              <td class="high">${i.h}</td>
                              <td class="low">${i.l}</td>
                              <td class="change">${change}</td>
                              <td class="change-percent="">${changePct}</td>
                              <td class="volume">${formattedVol}</td>`;
        table.appendChild(tableRow);



        // If the closing cost is higher than the previous day's high, make the text color green. Otherwise make it red.
        const close = tableRow.querySelector(".close");

        if (i.c >= prevClose) {
            close.style.color = "#037b4b";
        } else {
            close.style.color = "#d60a22";
        }

    }



}


// function renderCurrencyExchangeRates(exchanges) {

//     console.log(exchanges);

// }


function addSearchFormHandling(form, onSubmit) {

    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const raw = (document.getElementById("search-input") || {}).value || "";
            const ticker = raw.trim().toUpperCase();
            if (!ticker) return;

            if (typeof onSubmit === "function") onSubmit(ticker);


            return ticker;
        });
    }

}



document.addEventListener("DOMContentLoaded", async () => {
    navInit();
    footerInit();
    renderPinnedStocks();

    let userInput = "Search a stock ticker to get started";

    // Default text when the page is loaded
    const stockTicker = document.getElementById("ticker");
    stockTicker.textContent = userInput;

    if (userInput !== "") {

        const form = document.getElementById("search-form");
        addSearchFormHandling(form, async (ticker) => {
            // Pass this function as an argument to run when the form is submitted
            userInput = ticker;
            try {
                const stockInfo = await retrieveStockData(userInput);
                renderStockData(stockInfo, userInput);

                const data = await retrieveHistoricalStockData(userInput);
                renderHistoricStockData(data.results);


                // const exchangeRates = await retrieveCurrencyExchangeRate();
                // const exchanges = await calculateStockExchangePrice(exchangeRates, stockInfo.c);
                // renderCurrencyExchangeRates(exchanges);
            } catch (err) {
                console.error(err);
            }
        });



    }


});