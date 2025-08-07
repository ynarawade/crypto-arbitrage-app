// "use client";
import { Table, TableCaption } from "@/components/ui/table";
import UsdtInrArbiTableHeader from "./UsdtInrArbiTableHeader";
import UsdtInrArbiTableBody from "./UsdtInrArbiTableBody";

function UsdtInrArbitrageTable() {
  return (
    <Table>
      <TableCaption>
        Note: All profits are calculated assuming a default wallet balance of
        1000 USDT. A total trading fee of 0.4% has been accounted for — 0.1% on
        Binance/KuCoin and 0.3% on ZebPay.
      </TableCaption>
      <UsdtInrArbiTableHeader />
      <UsdtInrArbiTableBody />
    </Table>
  );
}

export default UsdtInrArbitrageTable;
