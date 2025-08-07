import { TableCell, TableRow } from "../../ui/table";
import UsdtInrConversionRateTableCell from "./UsdtInrConversionRateTableCell";
import UsdtInrArbiExchangeTableCell from "./UsdtInrExchangeTableCell";
import { cn } from "@/lib/utils";

export type InrArbitrageType = {
  pair: string;
  buyExchange?: "Binance(USDT)" | "KuCoin(USDT)" | "Zebpay(INR)";
  sellExchange?: "Binance(USDT)" | "KuCoin(USDT)" | "Zebpay(INR)";
  buyPrice?: number;
  sellPrice?: number;
  profit?: number;
  spread?: number;
  usdtInrRate?: number;
  buyCostInr?: number;
  loading?: boolean;
};

export default function UsdtInrArbitrageTableRow({
  pair,
  buyExchange,
  sellExchange,
  buyPrice,
  sellPrice,
  usdtInrRate,
  buyCostInr,
  profit,
  spread,
  loading,
}: InrArbitrageType) {
  return (
    <TableRow>
      <TableCell className="font-medium text-sm px-2 py-1">{pair}</TableCell>
      {loading ? (
        <TableCell colSpan={5} className="text-center text-muted-foreground">
          Loading...
        </TableCell>
      ) : (
        <>
          <UsdtInrArbiExchangeTableCell
            exchange={buyExchange!}
            price={buyPrice!}
          />
          <UsdtInrArbiExchangeTableCell
            exchange={sellExchange!}
            price={sellPrice!}
          />
          <UsdtInrConversionRateTableCell
            rate={usdtInrRate!}
            buyCostInr={buyCostInr!}
          />
          <TableCell
            className={cn(
              "text-sm font-bold px-2 py-1",
              profit && profit > 0 ? "text-green-600" : "text-muted-foreground"
            )}
          >
            ₹{profit?.toFixed(0)}
          </TableCell>
          <TableCell
            className={cn(
              "text-sm font-bold px-2 py-1",
              spread && spread > 0 ? "text-green-600" : "text-muted-foreground"
            )}
          >
            {spread?.toFixed(2)}%
          </TableCell>
        </>
      )}
    </TableRow>
  );
}
