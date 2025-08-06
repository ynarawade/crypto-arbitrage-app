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
      id: Date.now(),
      type: "subscribe",
      topic: `/market/ticker:${symbols}`,
      response: true,
    };

    ws.send(JSON.stringify(data));

    {
      /* SEND PING EVERY 15 SEC TO KEEP CONNECTION ALIVE */
    }
    const pindData = {
      id: Date.now(),
      type: "ping",
    };
    const pingInterval = setInterval(() => {
      ws.send(JSON.stringify(pindData));
    }, 30 * 1000);

    ws.on("close", () => {
      console.log("KuCoin WebSocket Closed");
      clearInterval(pingInterval);
    });
    ws.on("error", (err) => {
      console.error("WebSocket Error:", err);
      clearInterval(pingInterval);
    });
  });

  ws.on("message", (message) => {
    try {
      const parsed = JSON.parse(message.toString());

      if (parsed?.data) {
        handleKuCoinTicker(parsed);
      } else {
        console.warn("KuCoin: Unexpected message format", parsed);
      }
    } catch (error) {
      console.error("Error parsing KuCoin ticker data:", error);
      console.error("RAW MESSAGE:", message.toString());
    }
  });
}
