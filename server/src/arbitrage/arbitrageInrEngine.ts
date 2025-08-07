import { DEFAULT_CAPITAL_USDT, InrArbitrageType } from "../constants";
import { getPrice } from "../prices/priceStore";

interface CalculateInrArbitrageProps {
  symbolUsdt: string; // e.g., BTCUSDT
  symbolInr: string; // e.g., BTC-INR
}

export function calculateInrArbitrage({
  symbolUsdt,
  symbolInr,
}: CalculateInrArbitrageProps): InrArbitrageType[] | null {
  const binance = getPrice("binance", symbolUsdt);
  const kucoin = getPrice("kucoin", symbolUsdt);
  const zebpayInr = getPrice("zebpay", symbolInr);
  const usdtInr = getPrice("zebpay", "USDT-INR");

  if (!binance || !kucoin || !zebpayInr || !usdtInr) return null;

  const token = symbolUsdt.replace("USDT", "");

  const opportunities: InrArbitrageType[] = [];

  // 1. Buy Binance USDT → Sell Zebpay INR
  {
    const tokens = DEFAULT_CAPITAL_USDT / binance.ask;
    const sellInr = tokens * zebpayInr.bid;
    const costInr = DEFAULT_CAPITAL_USDT * usdtInr.ask;
    const profit = sellInr - costInr;
    const spread =
      ((zebpayInr.bid - binance.ask * usdtInr.ask) /
        (binance.ask * usdtInr.ask)) *
      100;

    opportunities.push({
      pair: token,
      buyExchange: "Binance(USDT)",
      sellExchange: "Zebpay(INR)",
      buyPrice: binance.ask,
      sellPrice: zebpayInr.bid,
      profit: Number(profit.toFixed(2)),
      spread: Number(spread.toFixed(2)),
      usdtInrRate: usdtInr.ask,
      buyCostInr: Number(costInr.toFixed(2)),
    });
  }

  // 2. Buy KuCoin USDT → Sell Zebpay INR
  {
    const tokens = DEFAULT_CAPITAL_USDT / kucoin.ask;
    const sellInr = tokens * zebpayInr.bid;
    const costInr = DEFAULT_CAPITAL_USDT * usdtInr.ask;
    const profit = sellInr - costInr;
    const spread =
      ((zebpayInr.bid - kucoin.ask * usdtInr.ask) /
        (kucoin.ask * usdtInr.ask)) *
      100;

    opportunities.push({
      pair: token,
      buyExchange: "KuCoin(USDT)",
      sellExchange: "Zebpay(INR)",
      buyPrice: kucoin.ask,
      sellPrice: zebpayInr.bid,
      profit: Number(profit.toFixed(2)),
      spread: Number(spread.toFixed(2)),
      usdtInrRate: usdtInr.ask,
      buyCostInr: Number(costInr.toFixed(2)),
    });
  }

  // 3. Buy Zebpay INR → Sell Binance USDT
  {
    const capitalInr = DEFAULT_CAPITAL_USDT * usdtInr.bid;
    const tokens = capitalInr / zebpayInr.ask;
    const sellUsdt = tokens * binance.bid;
    const costInr = sellUsdt * usdtInr.bid;
    const profit = costInr - capitalInr;
    const spread =
      ((binance.bid * usdtInr.bid - zebpayInr.ask) / zebpayInr.ask) * 100;

    opportunities.push({
      pair: token,
      buyExchange: "Zebpay(INR)",
      sellExchange: "Binance(USDT)",
      buyPrice: zebpayInr.ask,
      sellPrice: binance.bid,
      profit: Number(profit.toFixed(2)),
      spread: Number(spread.toFixed(2)),
      usdtInrRate: usdtInr.bid,
      buyCostInr: Number(capitalInr.toFixed(2)),
    });
  }

  // 4. Buy Zebpay INR → Sell KuCoin USDT
  {
    const capitalInr = DEFAULT_CAPITAL_USDT * usdtInr.bid;
    const tokens = capitalInr / zebpayInr.ask;
    const sellUsdt = tokens * kucoin.bid;
    const costInr = sellUsdt * usdtInr.bid;
    const profit = costInr - capitalInr;
    const spread =
      ((kucoin.bid * usdtInr.bid - zebpayInr.ask) / zebpayInr.ask) * 100;

    opportunities.push({
      pair: token,
      buyExchange: "Zebpay(INR)",
      sellExchange: "KuCoin(USDT)",
      buyPrice: zebpayInr.ask,
      sellPrice: kucoin.bid,
      profit: Number(profit.toFixed(2)),
      spread: Number(spread.toFixed(2)),
      usdtInrRate: usdtInr.bid,
      buyCostInr: Number(capitalInr.toFixed(2)),
    });
  }

  return opportunities;
}
