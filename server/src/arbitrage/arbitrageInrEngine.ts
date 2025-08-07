import { DEFAULT_CAPITAL_USDT } from "../constants";
import { getPrice } from "../prices/priceStore";

type InrArbitrageType = {
  pair: string;
  buyExchange: "Binance(USDT)" | "KuCoin(USDT)" | "Zebpay(INR)";
  sellExchange: "Binance(USDT)" | "KuCoin(USDT)" | "Zebpay(INR)";
  buyPrice: number;
  sellPrice: number;
  profit: number; // this will be raw profit no fee reductions
  spread: number;
  usdtInrRate: number;
  buyCostInr: number;
};

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

  const usdtInrRate = usdtInr.bid;
  const token = symbolUsdt.replace("USDT", "");

  const opportunities: InrArbitrageType[] = [];

  // 1. Buy Binance USDT → Sell Zebpay INR
  {
    const tokens = DEFAULT_CAPITAL_USDT / binance.ask;
    const sellInr = tokens * zebpayInr.bid;
    const costInr = DEFAULT_CAPITAL_USDT * usdtInrRate;
    const profit = sellInr - costInr;
    const spread =
      ((zebpayInr.bid - binance.ask * usdtInrRate) /
        (binance.ask * usdtInrRate)) *
      100;

    opportunities.push({
      pair: token,
      buyExchange: "Binance(USDT)",
      sellExchange: "Zebpay(INR)",
      buyPrice: binance.ask,
      sellPrice: zebpayInr.bid,
      profit: Number(profit.toFixed(2)),
      spread: Number(spread.toFixed(2)),
      usdtInrRate,
      buyCostInr: Number(costInr.toFixed(2)),
    });
  }

  // 2. Buy KuCoin USDT → Sell Zebpay INR
  {
    const tokens = DEFAULT_CAPITAL_USDT / kucoin.ask;
    const sellInr = tokens * zebpayInr.bid;
    const costInr = DEFAULT_CAPITAL_USDT * usdtInrRate;
    const profit = sellInr - costInr;
    const spread =
      ((zebpayInr.bid - kucoin.ask * usdtInrRate) /
        (kucoin.ask * usdtInrRate)) *
      100;

    opportunities.push({
      pair: token,
      buyExchange: "KuCoin(USDT)",
      sellExchange: "Zebpay(INR)",
      buyPrice: kucoin.ask,
      sellPrice: zebpayInr.bid,
      profit: Number(profit.toFixed(2)),
      spread: Number(spread.toFixed(2)),
      usdtInrRate,
      buyCostInr: Number(costInr.toFixed(2)),
    });
  }

  // 3. Buy Zebpay INR → Sell Binance USDT
  {
    const capitalInr = DEFAULT_CAPITAL_USDT * usdtInrRate;
    const tokens = capitalInr / zebpayInr.ask;
    const sellUsdt = tokens * binance.bid;
    const sellInr = sellUsdt * usdtInrRate;
    const profit = sellInr - capitalInr;
    const spread =
      ((binance.bid * usdtInrRate - zebpayInr.ask) / zebpayInr.ask) * 100;

    opportunities.push({
      pair: token,
      buyExchange: "Zebpay(INR)",
      sellExchange: "Binance(USDT)",
      buyPrice: zebpayInr.ask,
      sellPrice: binance.bid,
      profit: Number(profit.toFixed(2)),
      spread: Number(spread.toFixed(2)),
      usdtInrRate,
      buyCostInr: Number(capitalInr.toFixed(2)),
    });
  }

  // 4. Buy Zebpay INR → Sell KuCoin USDT
  {
    const capitalInr = DEFAULT_CAPITAL_USDT * usdtInrRate;
    const tokens = capitalInr / zebpayInr.ask;
    const sellUsdt = tokens * kucoin.bid;
    const sellInr = sellUsdt * usdtInrRate;
    const profit = sellInr - capitalInr;
    const spread =
      ((kucoin.bid * usdtInrRate - zebpayInr.ask) / zebpayInr.ask) * 100;

    opportunities.push({
      pair: token,
      buyExchange: "Zebpay(INR)",
      sellExchange: "KuCoin(USDT)",
      buyPrice: zebpayInr.ask,
      sellPrice: kucoin.bid,
      profit: Number(profit.toFixed(2)),
      spread: Number(spread.toFixed(2)),
      usdtInrRate,
      buyCostInr: Number(capitalInr.toFixed(2)),
    });
  }

  return opportunities;
}
