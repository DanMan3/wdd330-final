
import navInit from "./navigation.mjs";
import footerInit from "./dates.mjs";

document.addEventListener("DOMContentLoaded", () => {
  navInit();
  footerInit();
  console.log('Env:', import.meta.env);
});