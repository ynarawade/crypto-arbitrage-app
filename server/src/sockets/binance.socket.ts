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
  ws.on("message",(message)=>{
    try {
      const parsed = JSON.parse(message.toString());
      if (parsed?.data?.s) {
        handleBinanceTicker(parsed.data);
      }
    } catch (error) {
      throw new Error("Error parsing binance ticker data!!");
    }
  })
 
}
