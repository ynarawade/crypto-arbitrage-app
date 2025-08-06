import React from "react";
import { TableHead, TableHeader, TableRow } from "../ui/table";

function ArbitrageTableHeader() {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="w-[100px]">Pair</TableHead>
        <TableHead>Buy Exchange</TableHead>
        <TableHead>Sell Exchange</TableHead>
        <TableHead >Overall Profit</TableHead>
        <TableHead>Spread %</TableHead>
      </TableRow>
    </TableHeader>
  );
}

export default ArbitrageTableHeader;
