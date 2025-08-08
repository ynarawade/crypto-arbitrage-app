import React from "react";
import { TableCell, TableRow } from "./ui/table";

function ShimmerLoadingRow() {
  return (
    <TableRow>
      <TableCell colSpan={6}>
        <div className="h-15 w-full bg-gray-200 dark:bg-gray-700 rounded-md fade-in-out"></div>
      </TableCell>
    </TableRow>
  );
}

export default ShimmerLoadingRow;
