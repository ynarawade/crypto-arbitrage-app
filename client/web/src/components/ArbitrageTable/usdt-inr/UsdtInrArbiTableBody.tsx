import { TableBody } from "@/components/ui/table";
import React, { useEffect, useState } from "react";
import UsdtInrArbitrageTableRow from "./UsdtInrArbiTableRow";
import { io } from "socket.io-client";
import { TRADING_FEES } from "@/app/constants";
import ShimmerLoadingRow from "@/components/ShimmerLoadingRow";

type InrArbitrageType = {
  pair: string;
  buyExchange?: "Binance(USDT)" | "KuCoin(USDT)" | "Zebpay(INR)";
  sellExchange?: "Binance(USDT)" | "KuCoin(USDT)" | "Zebpay(INR)";
  buyPrice?: number;
  sellPrice?: number;
  profit?: number; // this will be raw profit no fee reductions
  spread?: number;
  usdtInrRate?: number;
  buyCostInr?: number;
  loading?: boolean;
};

function UsdtInrArbiTableBody() {
  const [data, setData] = useState<InrArbitrageType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const socket = io("ws://localhost:4000");

    socket.on("connect", () => {
      console.log("Connected to WebSocket");
    });

    socket.on(
      "inr-arbitrage",
      (incoming: InrArbitrageType | InrArbitrageType[]) => {
        const incomingArray = Array.isArray(incoming) ? incoming : [incoming];
        const totalFeeRate =
          TRADING_FEES.zebpay.inr + TRADING_FEES.binance.usdt;

        const withFeesDeducted = incomingArray.map((entry) => ({
          ...entry,
          profit: entry.profit ? +(entry.profit * (1 - totalFeeRate)) : 0,
        }));

        setData(() => [...withFeesDeducted]);
        setLoading(!loading);
      }
    );
    socket.on("disconnect", () => {
      console.log("Disconnected from WebSocket");
    });

    return () => {
      socket.disconnect();
    };
  }, []);
  return (
    <TableBody>
      {loading
        ? Array.from({ length: 7 }).map((_, i) => (
            <ShimmerLoadingRow key={i} />
          ))
        : data.map((item, index) => (
            <UsdtInrArbitrageTableRow key={item.pair + index} {...item} />
          ))}
    </TableBody>
  );
}
export default UsdtInrArbiTableBody;
