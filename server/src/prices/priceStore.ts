type PriceData = {
  bid: number;
  ask: number;
  timestamps?: number;
};

type Exchange = "binance" | "kucoin" | "zebpay";

const prices: Record<Exchange, Map<string, PriceData>> = {
  binance: new Map(),
  kucoin: new Map(),
  zebpay: new Map(),
};

export function updatePrice(
  exchange: Exchange,
  symbol: string,
  data: PriceData
) {
  prices[exchange].set(symbol, { ...data, timestamps: Date.now() });
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
