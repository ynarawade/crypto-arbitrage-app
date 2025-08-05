export const BINANCE_BASE_STREAM = "wss://fstream.binance.com";
export const getBookTickerUrl = (symbols: string[]) => {
  const streamPath = symbols.map((s) => `${s.toLowerCase()}@bookTicker`).join("/");
  return `${BINANCE_BASE_STREAM}/stream?streams=${streamPath}`;
};
