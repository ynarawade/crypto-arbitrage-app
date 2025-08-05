import WebSocket from "ws";
import { getKuCoinTickerUrl } from "../config/kucoin.config";
import { handleKuCoinTicker } from "../services/kuCoinTickerHandler.service";

export async function connectToKuCoin(symbols: string[]) {
  const urlWithToken = await getKuCoinTickerUrl(); // Get url with token attatched
  console.log("URL,", urlWithToken);

  const ws = new WebSocket(urlWithToken); // make a connection to the websocket

  ws.on("open", () => {
    console.log("----- CONNECTED TO KUCOIN WEBSOCKET -----");
    const data = {
      id: 1,
      type: "subscribe",
      topic: `/market/ticker:${symbols}`,
      response: true,
    };

    ws.send(JSON.stringify(data));
  });

  ws.on("message", (message) => {
    try {
      const parsed = JSON.parse(message.toString());      
      if (parsed?.data) {
        handleKuCoinTicker(parsed);
      }
    } catch (error) {
      throw new Error("Error parsing kucoin ticker data!!");
    }
  });
}
