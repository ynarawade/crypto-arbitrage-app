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

        const withFeesDeducted = incomingArray.map((entry) => {
          if (!entry.profit) return { ...entry, profit: 0 };

          const rawProfit = entry.profit;

          // Trading + TDS cut (assume binance buy + zebpay sell for now)
          const tradingFeeRate =
            TRADING_FEES.zebpay.inr +
            TRADING_FEES.binance.usdt +
            TRADING_FEES.tds;

            
            

          const afterFees = rawProfit * (1 - tradingFeeRate);
          console.log("TRADING FEES",(1-tradingFeeRate));

          // Govt tax only if profit is positive
          const govtTax = afterFees > 0 ? afterFees * TRADING_FEES.govtTax : 0;

          console.log("GOVT FEES",govtTax);
          const netProfit = afterFees - govtTax;


          return {
            ...entry,
            profit: +netProfit.toFixed(2),
          };
        });

        setData(() => [...withFeesDeducted]);
        setLoading(false);
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
        ? Array.from({ length: 7 }).map((_, i) => <ShimmerLoadingRow key={i} />)
        : data.map((item, index) => (
            <UsdtInrArbitrageTableRow key={item.pair + index} {...item} />
          ))}
    </TableBody>
  );
}
export default UsdtInrArbiTableBody;
