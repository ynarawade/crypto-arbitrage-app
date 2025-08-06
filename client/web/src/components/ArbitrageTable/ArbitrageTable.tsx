import ExchangeTableCell from "@/components/ArbitrageTable/ExchangeTableCell";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
