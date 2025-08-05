import WebSocket from "ws";
import { getKuCoinAllTickerUrl } from "../config/kucoin.config";

export async function connectToKuCoin(symbols:string[]) {
  const urlWithToken = await getKuCoinAllTickerUrl(); // Get url with token attatched
  console.log("URL,",urlWithToken);
  
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
    console.log("MESSAGE INCOMING FORM KUCOIN");
    console.log(message.toString());
  });
}
