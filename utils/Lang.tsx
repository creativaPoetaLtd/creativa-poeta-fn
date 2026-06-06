import { getCurrentLocale, getCurrentMarket } from "../src/data/marketRuntime";

function getLangFromLocalStorage() {
  const market = getCurrentMarket();
  return getCurrentLocale(market);
}

export default getLangFromLocalStorage;
