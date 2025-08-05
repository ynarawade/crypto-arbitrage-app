type PriceData = {
  bid: number;
  ask: number;
  transactionTimestamp: number;
};

type Exchange = "binance" | "kucoin";

const prices: Record<Exchange, Map<string, PriceData>> = {
  binance: new Map(),
  kucoin: new Map(),
};

export function updatePrice(
  exchange: Exchange,
  symbol: string,
  data: PriceData
) {
  prices[exchange].set(symbol, data);
}

export function getPrice(
  exchange: Exchange,
  symbol: string
): PriceData | undefined {
  return prices[exchange].get(symbol);
}

export function getAllPrices() {
  return prices;
}
