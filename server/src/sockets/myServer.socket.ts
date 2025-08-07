import { Server } from "node:http";
import { Server as ioServer } from "socket.io";
import { calculateArbitrage } from "../arbitrage/arbitrageEngine";
import { PROFIT_THRESHOLD } from "../constants";
import { calculateInrArbitrage } from "../arbitrage/arbitrageInrEngine";

export function bootMyServer(server: Server) {
  const symbols = ["TONUSDT", "BTCUSDT", "ETHUSDT", "SOLUSDT"];
  const symbolsInr = ["TON-INR", "BTC-INR", "ETH-INR", "SOL-INR"];
  const io = new ioServer(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("---- A USER CONNECTED TO SERVER ----");

    // const interval = setInterval(() => {
    //   const results = symbols
    //     .map(calculateArbitrage)
    //     .filter((e) => e && e?.profitPercent > PROFIT_THRESHOLD);
    //   console.log("ARBITRAGE-----", results);
    //   socket.emit("arbitrage", results);
    // }, 750);

    const interval2 = setInterval(() => {
      let result;
      for (let i = 0; i < symbols.length; i++) {
        result = calculateInrArbitrage({
          symbolUsdt: symbols[i],
          symbolInr: symbolsInr[i],
        });
      }
      console.log("ARBITRAGE-----", result);
    }, 8000);

    socket.on("disconnect", () => {
      //   clearInterval(interval);
      clearInterval(interval2);
      console.log("CONNECTION CLOSED");
    });
  });
}
