"use client";
import { Table, TableCaption } from "@/components/ui/table";
import ArbitrageTableHeader from "./ArbitrageTableHeader";
import ArbitrageTableBody from "./ArbitrageTableBody";

function ArbitrageTable() {
  return (
    <Table>
      <TableCaption>
        Note: A total trading fee of 0.2% (both exchanges combined) is included
        in the profit calculations.
      </TableCaption>
      <ArbitrageTableHeader />
      <ArbitrageTableBody />
    </Table>
  );
}

export default ArbitrageTable;
