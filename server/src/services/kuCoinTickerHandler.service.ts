import { getSymbolFromTopic } from "../utils/helper";

export function handleKuCoinTicker(data:any){
    const symbol = getSymbolFromTopic(data.topic);
    const ask = data.data.bestAsk;
    const bid = data.data.bestBid;
    const transactionTimestamp = data.data.Time;


  console.log(`📊 ${symbol} → BID: ${bid}, ASK: ${ask}`);
}