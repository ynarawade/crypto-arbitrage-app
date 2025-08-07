import { Server } from "node:http";
import { Server as ioServer } from "socket.io";
import { calculateArbitrage } from "../arbitrage/arbitrageEngine";
import { InrArbitrageType, PROFIT_THRESHOLD } from "../constants";
import { calculateInrArbitrage } from "../arbitrage/arbitrageInrEngine";

export function bootMyServer(server: Server) {
  const symbols = ["TONUSDT", "BTCUSDT", "ETHUSDT", "SOLUSDT"];
  const pairs = [
    { usdt: "TONUSDT", inr: "TON-INR" },
    { usdt: "BTCUSDT", inr: "BTC-INR" },
    { usdt: "ETHUSDT", inr: "ETH-INR" },
    { usdt: "SOLUSDT", inr: "SOL-INR" },
  ];
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
      const results: InrArbitrageType[] = [];

      for (const { usdt, inr } of pairs) {
        const result = calculateInrArbitrage({
          symbolUsdt: usdt,
          symbolInr: inr,
        });
        if (result && result.length > 0) {
          results.push(...result); // spread the array into the final list
        }
      }

      if (results.length > 0) {
        console.log("INR ARBITRAGE -----", results);
        socket.emit("inr-arbitrage", results);
      }
    }, 1000);

    socket.on("disconnect", () => {
      //   clearInterval(interval);
      clearInterval(interval2);
      console.log("CONNECTION CLOSED");
    });
  });
}
