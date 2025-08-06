import React, { useEffect, useState } from "react";
import { TableBody } from "../ui/table";
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
// const dummyArbitrageData: ArbitrageResult[] = [
//   {
//     pair: "BTCUSDT",
//     buyExchange: "binance",
//     sellExchange: "kucoin",
//     buyPrice: 29000.12,
//     sellPrice: 29150.55,
//     profitPercent: 0.52,
//   },
//   {
//     pair: "ETHUSDT",
//     buyExchange: "kucoin",
//     sellExchange: "binance",
//     buyPrice: 1850.44,
//     sellPrice: 1862.77,
//     profitPercent: 0.67,
//   },
//   {
//     pair: "SOLUSDT",
//     buyExchange: "binance",
//     sellExchange: "kucoin",
//     buyPrice: 22.5,
//     sellPrice: 22.8,
//     profitPercent: 1.33,
//   },
//   {
//     pair: "XRPUSDT",
//     buyExchange: "kucoin",
//     sellExchange: "binance",
//     buyPrice: 0.6234,
//     sellPrice: 0.6321,
//     profitPercent: 1.39,
//   },
//   {
//     pair: "TONUSDT",
//     buyExchange: "binance",
//     sellExchange: "kucoin",
//     buyPrice: 3.24,
//     sellPrice: 3.27,
//     profitPercent: 0.93,
//   },
// ];

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
