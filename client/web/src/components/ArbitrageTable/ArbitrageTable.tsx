"use client";
import { Table } from "@/components/ui/table";
import ArbitrageTableHeader from "./ArbitrageTableHeader";
import ArbitrageTableBody from "./ArbitrageTableBody";

function ArbitrageTable() {
  return (
    <Table>
      <ArbitrageTableHeader />
      <ArbitrageTableBody />
    </Table>
  );
}

export default ArbitrageTable;
