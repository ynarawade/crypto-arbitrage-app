import WebSocket from "ws";
import { getBookTickerUrl } from "../config/binance.config";
import { handleBinanceTicker } from "../services/binanceTickerHandler.service";

export function connectToBinanceBookTicker(symbols: string[]) {
  const url = getBookTickerUrl(symbols);
  const ws = new WebSocket(url);

  // Making a connection
  ws.onopen = () => {
    console.log("CONNECTED TO BINANCE TICKER STREAM");
  };

  // Handling messages
  ws.on("message", (message) => {
    try {
      const parsed = JSON.parse(message.toString());

      if (parsed?.data?.s) {
        handleBinanceTicker(parsed.data);
      } else {
        console.warn("Binance: Unexpected message format", parsed);
      }
    } catch (error) {
      console.error("Error parsing Binance ticker data:", error);
      console.error("RAW MESSAGE:", message.toString());
    }
  });

}
