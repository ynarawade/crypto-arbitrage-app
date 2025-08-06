import { updatePrice } from "../prices/priceStore";

export function handleBinanceTicker(data: any) {
  const symbol = data.s;
  const bid = data.b;
  const ask = data.a;

  // console.log(`📊 ${symbol} → BID: ${bid}, ASK: ${ask}`);
  updatePrice("binance", symbol, {
    ask: parseFloat(ask),
    bid: parseFloat(bid),
  });
}
