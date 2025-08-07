import WebSocket from "ws";
import { ZEBPAY_BASE_STREAM } from "../config/zebpay.config";
import { handleZebpayTopBuySell } from "../services/zebpayTopBuySellHandler.service";

export function connectToZebpaySocket(symbol: string[]) {
  const ws = new WebSocket(ZEBPAY_BASE_STREAM);

  ws.on("open", () => {
    console.log("CONNECTED-TO-ZEBPAY-------");

    symbol.forEach((symbol) => {
      console.log("SYMBOL", symbol);

      const data = {
        request: `exchange/${symbol}`,
      };
      ws.send(JSON.stringify(data));
    });
  });

  ws.on("message", (message) => {
    const parsed = JSON.parse(message.toString());
    if (
      parsed.type === "exchange-topbuy" ||
      parsed.type === "exchange-topsell"
    ) {
      handleZebpayTopBuySell(parsed);
    }
  });
}
