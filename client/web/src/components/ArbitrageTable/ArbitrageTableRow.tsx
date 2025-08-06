import React from "react";
import { TableCell, TableRow } from "../ui/table";
import ExchangeTableCell from "./ExchangeTableCell";

type ArbitrageResult = {
  pair: string;
  buyExchange: "binance" | "kucoin";
  sellExchange: "binance" | "kucoin";
  buyPrice: number;
  sellPrice: number;
  profitPercent: number;
};

function ArbitrageTableRow({
  pair,
  buyExchange,
  sellExchange,
  buyPrice,
  sellPrice,
  profitPercent,
}: ArbitrageResult) {
  return (
    <TableRow>
      <TableCell className="font-medium">{pair}</TableCell>
      <ExchangeTableCell exchange={buyExchange} price={buyPrice} />
      <ExchangeTableCell exchange={sellExchange} price={sellPrice} />
      <TableCell>{`${profitPercent}%`}</TableCell>
      <TableCell>{`${profitPercent}%`}</TableCell>
    </TableRow>
  );
}

export default ArbitrageTableRow;
