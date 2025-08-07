import { TableCell, TableRow } from "../../ui/table";
import ExchangeTableCell from "./ExchangeTableCell";

type ArbitrageResult = {
  pair: string;
  buyExchange?: "binance" | "kucoin";
  sellExchange?: "binance" | "kucoin";
  buyPrice?: number;
  sellPrice?: number;
  profitPercent?: number;
  spread?: number;
  loading?: boolean;
};

function ArbitrageTableRow({
  pair,
  buyExchange,
  sellExchange,
  buyPrice,
  sellPrice,
  profitPercent,
  spread,
  loading,
}: ArbitrageResult) {
  return (
    <TableRow>
      <TableCell className="font-medium">{pair}</TableCell>
      {loading ? (
        <TableCell colSpan={5}>Loading...</TableCell>
      ) : (
        <>
          <ExchangeTableCell exchange={buyExchange!} price={buyPrice!} />
          <ExchangeTableCell exchange={sellExchange!} price={sellPrice!} />
          <TableCell>{`${profitPercent!.toFixed(2)}%`}</TableCell>
          <TableCell>{`${spread!.toFixed(2)}%`}</TableCell>
        </>
      )}
    </TableRow>
  );
}

export default ArbitrageTableRow;
