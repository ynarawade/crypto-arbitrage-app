import React, { useEffect, useState } from "react";
import { TableBody } from "../../ui/table";
import ArbitrageTableRow from "./ArbitrageTableRow";
import { io } from "socket.io-client";

type ArbitrageResult = {
  pair: string;
  buyExchange: "binance" | "kucoin";
  sellExchange: "binance" | "kucoin";
  buyPrice: number;
  sellPrice: number;
  profitPercent: number;
  spread: number;
};

type ArbitrageMap = Record<string, ArbitrageResult>;
const symbols = ["TONUSDT", "BTCUSDT", "ETHUSDT", "SOLUSDT"];
const TOTAL_FEES = 0.2; // This is in percentage

function ArbitrageTableBody() {
  const [data, setData] = useState<ArbitrageMap>({});

  useEffect(() => {
    const socket = io("ws://localhost:4000");

    socket.on("connect", () => {
      console.log("Connected to WebSocket");
    });

    socket.on("arbitrage", (incomingData) => {
      console.log("ARBI----", incomingData);

      setData((prev) => {
        const updated = { ...prev };
        incomingData.forEach((item: ArbitrageResult) => {
          item.profitPercent = item.profitPercent - TOTAL_FEES;
          updated[item.pair] = item;
        });
        return updated;
      }); // incomingData is already an array
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from WebSocket");
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <TableBody>
      {symbols.map((symbol) => {
        const item = data[symbol];
        return item ? (
          <ArbitrageTableRow key={symbol} {...item} />
        ) : (
          <ArbitrageTableRow key={symbol} pair={symbol} loading={true} />
        );
      })}
    </TableBody>
  );
}

export default ArbitrageTableBody;
