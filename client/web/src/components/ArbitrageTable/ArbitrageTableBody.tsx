import React from "react";
import { TableBody } from "../ui/table";
import ArbitrageTableRow from "./ArbitrageTableRow";

type ArbitrageResult = {
  pair: string;
  buyExchange: "binance" | "kucoin";
  sellExchange: "binance" | "kucoin";
  buyPrice: number;
  sellPrice: number;
  profitPercent: number;
};

const dummyArbitrageData:ArbitrageResult[] = [
  {
    pair: "BTCUSDT",
    buyExchange: "binance",
    sellExchange: "kucoin",
    buyPrice: 29000.12,
    sellPrice: 29150.55,
    profitPercent: 0.52,
  },
  {
    pair: "ETHUSDT",
    buyExchange: "kucoin",
    sellExchange: "binance",
    buyPrice: 1850.44,
    sellPrice: 1862.77,
    profitPercent: 0.67,
  },
  {
    pair: "SOLUSDT",
    buyExchange: "binance",
    sellExchange: "kucoin",
    buyPrice: 22.5,
    sellPrice: 22.8,
    profitPercent: 1.33,
  },
  {
    pair: "XRPUSDT",
    buyExchange: "kucoin",
    sellExchange: "binance",
    buyPrice: 0.6234,
    sellPrice: 0.6321,
    profitPercent: 1.39,
  },
  {
    pair: "TONUSDT",
    buyExchange: "binance",
    sellExchange: "kucoin",
    buyPrice: 3.24,
    sellPrice: 3.27,
    profitPercent: 0.93,
  },
];

function ArbitrageTableBody() {
  return (
    <TableBody>
      {dummyArbitrageData.map((item) => (
        <ArbitrageTableRow
          key={item.pair}
          pair={item.pair}
          buyExchange={item.buyExchange}
          sellExchange={item.sellExchange}
          buyPrice={item.buyPrice}
          sellPrice={item.sellPrice}
          profitPercent={item.profitPercent}
        />
      ))}
    </TableBody>
  );
}

export default ArbitrageTableBody;
