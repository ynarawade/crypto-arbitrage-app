import { updatePrice } from "../prices/priceStore";

const zebpayBook: Record<string, { bid: number | null; ask: number | null }> =
  {};

export function handleZebpayTopBuySell(data: any) {
  const symbol = data.requestType;
  const price = data.data;
  const type = data.type;

  // Initialize if not present
  if (!zebpayBook[symbol]) {
    zebpayBook[symbol] = { bid: null, ask: null };
  }

  // Update bid or ask
  if (type === "exchange-topbuy") {
    zebpayBook[symbol].ask = price;
  } else if (type === "exchange-topsell") {
    zebpayBook[symbol].bid = price;
  }

  const { bid, ask } = zebpayBook[symbol];

  // Only print when both are available
  if (bid !== null && ask !== null) {
    // console.log(`ZEBPAY ${symbol} — bid: ${bid}, ask: ${ask}`);
   updatePrice("zebpay",symbol,{
    ask:parseFloat(ask.toString()),
    bid:parseFloat(bid.toString())
   })
  }
}
