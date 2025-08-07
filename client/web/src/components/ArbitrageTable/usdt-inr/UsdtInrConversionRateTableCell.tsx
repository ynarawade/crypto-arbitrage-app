import React from "react";
import { TableCell } from "@/components/ui/table";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

interface UsdtInrConversionRateTableCellProps {
  rate: number;
  buyCostInr: number;
}

export default function UsdtInrConversionRateTableCell({
  rate,
  buyCostInr,
}: UsdtInrConversionRateTableCellProps) {
  return (
 <TableCell className="text-sm px-2 py-1 whitespace-nowrap">
  ₹{rate.toFixed(2)} → ₹{buyCostInr.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
</TableCell>
  );
}
