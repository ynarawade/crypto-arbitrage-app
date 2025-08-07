import React from "react";
import { TableHead, TableHeader, TableRow } from "../../ui/table";

function UsdtInrArbiTableHeader() {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="w-[100px]">Pair</TableHead>
        <TableHead>Buy Exchange</TableHead>
        <TableHead>Sell Exchange</TableHead>
        <TableHead>Conversion Rate</TableHead>
        <TableHead>Overall Profit</TableHead>
        <TableHead>Spread %</TableHead>
      </TableRow>
    </TableHeader>
  );
}

export default UsdtInrArbiTableHeader;
