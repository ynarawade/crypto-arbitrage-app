import { updatePrice } from "../prices/priceStore";
import { getSymbolFromTopic } from "../utils/helper";

export function handleKuCoinTicker(data: any) {
  const symbol = getSymbolFromTopic(data.topic);
  const ask = data.data.bestAsk;
  const bid = data.data.bestBid;
  const transactionTimestamp = data.data.Time;
  updatePrice("kucoin", symbol, {
    bid: parseFloat(bid),
    ask: parseFloat(ask),
    transactionTimestamp,
  });

  //   console.log(`📊 ${symbol} → BID: ${bid}, ASK: ${ask}`);
}
