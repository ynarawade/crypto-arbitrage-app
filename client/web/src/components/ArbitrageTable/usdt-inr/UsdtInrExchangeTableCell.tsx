"use client";
import React from "react";
import { TableCell } from "@/components/ui/table";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

interface UsdtInrArbiExchangeTableCellProps {
  exchange: "Binance(USDT)" | "KuCoin(USDT)" | "Zebpay(INR)";
  price: number;
}

const getPricePrefix = (exchange: string) =>
  exchange === "Zebpay(INR)" ? "₹" : "$";

const getExchangeUrl = (exchange: string) => {
  switch (exchange) {
    case "Binance(USDT)":
      return "https://www.binance.com/en";
    case "KuCoin(USDT)":
      return "https://www.kucoin.com/";
    case "Zebpay(INR)":
      return "https://zebpay.com/exchange/";
    default:
      return "/";
  }
};

export default function UsdtInrArbiExchangeTableCell({
  exchange,
  price,
}: UsdtInrArbiExchangeTableCellProps) {
  return (
    <TableCell className="whitespace-nowrap px-2 py-1 text-sm">
      <Link
        href={getExchangeUrl(exchange)}
        target="_blank"
        className="text-orange-500 dark:text-orange-400 flex items-center gap-1 text-sm font-normal"
      >
        {exchange}
        <ExternalLink className="h-3 w-3" />
      </Link>
      <div className="font-semibold text-md">
        {getPricePrefix(exchange)}
        {price?.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
      </div>
    </TableCell>
  );
}
