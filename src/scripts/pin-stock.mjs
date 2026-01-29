

const KEY = "pinned-stocks";

export function pinStock(ticker) {
    if (!ticker) return;
    const stocks = getPinnedStocks();
    if (stocks.some(s => String(s).toUpperCase() === ticker)) return; // already pinned
    stocks.push(ticker);
    localStorage.setItem(KEY, JSON.stringify(stocks));
}



export function unpinStock(ticker) {

    if (!ticker) return

    const key = String(ticker).toUpperCase();
    const stocks = getPinnedStocks();
    const filtered = stocks.filter(item => ((item.ticker || item).toString().toUpperCase()) !== key);


    localStorage.setItem(KEY, JSON.stringify(filtered));
}



export function getPinnedStocks() {


    const raw = localStorage.getItem(KEY);
    try {
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }

}


export function renderPinnedStocks() {

    const parsed = getPinnedStocks();
    const pinnedStocks = document.querySelector(".pinned-stocks");
    if (!pinnedStocks) return;

    pinnedStocks.innerHTML = "";
    const pinnedStocksHeader = document.createElement("h2");
    pinnedStocksHeader.textContent = "Pinned Stocks";
    pinnedStocks.appendChild(pinnedStocksHeader);

    if (!parsed.length) {
        pinnedStocks.classList.add("hidden");
        return;
    }

    pinnedStocks.classList.remove("hidden");


    for (const i of parsed) {

        const pinnedStockDiv = document.createElement("div");
        pinnedStockDiv.className = "pinned-stock";

        const newPin = document.createElement("p");
        newPin.textContent = i;

        const unpinButton = document.createElement("button");
        unpinButton.type = "button";
        unpinButton.textContent = "X";
        unpinButton.addEventListener("click", () => {
            unpinStock(i);
            renderPinnedStocks();
        });


        pinnedStockDiv.appendChild(newPin);
        pinnedStockDiv.appendChild(unpinButton);
        pinnedStocks.appendChild(pinnedStockDiv);

    }

}