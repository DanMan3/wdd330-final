import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        news: resolve(__dirname, "src/news/news.html"),
        contact: resolve(__dirname, "src/contact/contact.html"),
        thankyou: resolve(__dirname, "src/thankyou/thank-you.html"),
        search: resolve(__dirname, "src/search/search.html"),
      },
    },
  },
});
