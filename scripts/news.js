import retrieveNews from "./search-news.mjs";
import navInit from "./navigation.mjs";
import footerInit from "./dates.mjs";




function addArticle(element, article) {

    const div = document.createElement("div");
    const url = document.createElement("a");


    url.textContent = article.title;
    url.href = article.url;
    div.className = "article-container";
    url.className = "article";

    div.appendChild(url);
    element.appendChild(div);

}





document.addEventListener("DOMContentLoaded", async () => {
    navInit();
    footerInit();

    try {
        const data = await retrieveNews();
        const articles = (data.articles || []).map(a => ({
            title: a.title,
            url: a.url
        }))

        const element = document.getElementById("articles");
        for (var i of articles) {
            addArticle(element, i);
        }

    } catch (err) {
        console.error(err);
    }
});



