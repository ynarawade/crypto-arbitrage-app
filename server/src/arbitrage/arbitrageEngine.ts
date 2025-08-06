import { getPrice } from "../prices/priceStore";

type ArbitrageResult = {
  pair: string;
  buyExchange: "binance" | "kucoin";
  sellExchange: "binance" | "kucoin";
  buyPrice: number;
  sellPrice: number;
  profitPercent: number;
  spread: number;
};

export function calculateArbitrage(symbol: string): ArbitrageResult | null {
  const binance = getPrice("binance", symbol);
  const kucoin = getPrice("kucoin", symbol);

  if (!binance || !kucoin) return null;

  const opportunities: ArbitrageResult[] = [];

  // Binance → KuCoin
  if (binance.ask < kucoin.bid) {
    const profit = ((kucoin.bid - binance.ask) / binance.ask) * 100;
    opportunities.push({
      pair: symbol,
      buyExchange: "binance",
      sellExchange: "kucoin",
      buyPrice: binance.ask,
      sellPrice: kucoin.bid,
      profitPercent: profit,
      spread: profit,
    });
  }

  // KuCoin → Binance
  if (kucoin.ask < binance.bid) {
    const profit = ((binance.bid - kucoin.ask) / kucoin.ask) * 100;
    opportunities.push({
      pair: symbol,
      buyExchange: "kucoin",
      sellExchange: "binance",
      buyPrice: kucoin.ask,
      sellPrice: binance.bid,
      profitPercent: profit,
      spread: profit,
    });
  }

  return opportunities[0];
}
