import { Server } from "node:http";
import { Server as ioServer } from "socket.io";
import { calculateArbitrage } from "../arbitrage/arbitrageEngine";
import { PROFIT_THRESHOLD } from "../constants";

export function bootMyServer(server: Server) {
  const symbols = ["TONUSDT","BTCUSDT","ETHUSDT","SOLUSDT"];
  const io = new ioServer(server);

  io.on("connection", (socket) => {
    console.log("---- A USER CONNECTED TO SERVER ----");

    const interval = setInterval(() => {
      const results = symbols
        .map(calculateArbitrage)
        .filter((e) => e && e?.profitPercent > PROFIT_THRESHOLD);
      console.log("ARBITRAGE-----", results);

      socket.emit("arbitrage", JSON.stringify(results));
    }, 2000);

    socket.on("disconnect", () => {
      clearInterval(interval);
      console.log("CONNECTION CLOSED");
    });
  });
}
