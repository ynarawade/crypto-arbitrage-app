import { TableBody } from "@/components/ui/table";
import React from "react";
import UsdtInrArbitrageTableRow from "./UsdtInrArbiTableRow";
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
export const dummyInrArbitrageData: InrArbitrageType[] = [
  {
    pair: "BTC",
    buyExchange: "Binance(USDT)",
    sellExchange: "Zebpay(INR)",
    buyPrice: 29500,
    sellPrice: 2480000,
    profit: 11000,
    spread: 1.45,
    usdtInrRate: 83.2,
    buyCostInr: 2469000,
  },
  {
    pair: "ETH",
    buyExchange: "KuCoin(USDT)",
    sellExchange: "Zebpay(INR)",
    buyPrice: 1800,
    sellPrice: 151000,
    profit: 800,
    spread: 0.53,
    usdtInrRate: 83.1,
    buyCostInr: 150200,
  },
  {
    pair: "SOL",
    buyExchange: "Binance(USDT)",
    sellExchange: "Zebpay(INR)",
    buyPrice: 22.3,
    sellPrice: 1860,
    profit: 75,
    spread: 1.28,
    usdtInrRate: 83.4,
    buyCostInr: 1785,
  },
  {
    pair: "BTC",
    buyExchange: "Zebpay(INR)",
    sellExchange: "KuCoin(USDT)",
    buyPrice: 2490000,
    sellPrice: 29700,
    profit: 9800,
    spread: 1.39,
    usdtInrRate: 83.1,
    buyCostInr: 2481000,
  },
  {
    pair: "ETH",
    buyExchange: "Zebpay(INR)",
    sellExchange: "Binance(USDT)",
    buyPrice: 152000,
    sellPrice: 1812,
    profit: 860,
    spread: 0.56,
    usdtInrRate: 83.2,
    buyCostInr: 150800,
  },
  {
    pair: "SOL",
    buyExchange: "Zebpay(INR)",
    sellExchange: "KuCoin(USDT)",
    buyPrice: 1875,
    sellPrice: 22.4,
    profit: 80,
    spread: 1.35,
    usdtInrRate: 83.6,
    buyCostInr: 1795,
  },
  {
    pair: "TON",
    buyExchange: "Binance(USDT)",
    sellExchange: "Zebpay(INR)",
    buyPrice: 6.2,
    sellPrice: 520,
    profit: 15,
    spread: 0.91,
    usdtInrRate: 83.5,
    buyCostInr: 505,
  },
  {
    pair: "TON",
    buyExchange: "Zebpay(INR)",
    sellExchange: "KuCoin(USDT)",
    buyPrice: 526,
    sellPrice: 6.3,
    profit: 17,
    spread: 1.15,
    usdtInrRate: 83.4,
    buyCostInr: 509,
  },
  {
    pair: "ETH",
    buyExchange: "Binance(USDT)",
    sellExchange: "Zebpay(INR)",
    buyPrice: 1790,
    sellPrice: 151600,
    profit: 1200,
    spread: 0.79,
    usdtInrRate: 83.1,
    buyCostInr: 150400,
  },
  {
    pair: "BTC",
    buyExchange: "KuCoin(USDT)",
    sellExchange: "Zebpay(INR)",
    buyPrice: 29600,
    sellPrice: 2475000,
    profit: 9500,
    spread: 1.29,
    usdtInrRate: 83.0,
    buyCostInr: 2460500,
  },
];

function UsdtInrArbiTableBody() {
  return (
    <TableBody>
      {dummyInrArbitrageData.map((data,index) => {
        return <UsdtInrArbitrageTableRow key={data.pair+index} {...data} />;
      })}
    </TableBody>
  );
}

export default UsdtInrArbiTableBody;
