"use client";
import { Table, TableCaption } from "@/components/ui/table";
import UsdtInrArbiTableHeader from "./UsdtInrArbiTableHeader";
import UsdtInrArbiTableBody from "./UsdtInrArbiTableBody";

function UsdtInrArbitrageTable() {
  return (
    <Table>
      <TableCaption>
        Note: All profits are calculated assuming a default wallet balance of
        1000 USDT.
        <br />A total trading fee has been accounted for — 0.1% on Binance and
        KuCoin, and 0.08% (INR pairs) or 0.06% (USDT pairs) on ZebPay, depending
        on the trading pair.
      </TableCaption>
      <UsdtInrArbiTableHeader />
      <UsdtInrArbiTableBody />
    </Table>
  );
}

export default UsdtInrArbitrageTable;
