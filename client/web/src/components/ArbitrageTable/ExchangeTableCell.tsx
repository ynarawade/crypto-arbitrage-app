import React from "react";
import { TableCell } from "@/components/ui/table";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

interface ExchangeTableCellProps {
  exchange: "binance" | "kucoin";
  price: number;
}

export default function ExchangeTableCell({
  exchange,
  price,
}: ExchangeTableCellProps) {
  return (
    <TableCell>
      <div>
        <Link
          href={"/"}
          className="text-sm font-light text-orange-400 flex items-center gap-x-1.5"
        >
          {exchange}
          <ExternalLink className="h-3 w-3" />
        </Link>
        <h5 className="text-md font-medium">{`$${price}`}</h5>
      </div>
    </TableCell>
  );
}
