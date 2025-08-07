export const PROFIT_THRESHOLD = 0.01;
export const SYNC_THRESHOLD_MS = 500;
export const DEFAULT_CAPITAL_USDT = 1000;
export type InrArbitrageType = {
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

export const USDT_INR_PAIRS = [
  { usdt: "BTC-USDT", inr: "BTC-INR" },
  { usdt: "ETH-USDT", inr: "ETH-INR" },
  { usdt: "SOL-USDT", inr: "SOL-INR" },
  { usdt: "XRP-USDT", inr: "XRP-INR" },
  { usdt: "DOGE-USDT", inr: "DOGE-INR" },
  { usdt: "ADA-USDT", inr: "ADA-INR" },
  { usdt: "AVAX-USDT", inr: "AVAX-INR" },
  { usdt: "MATIC-USDT", inr: "MATIC-INR" },
  { usdt: "DOT-USDT", inr: "DOT-INR" },
  { usdt: "SHIB-USDT", inr: "SHIB-INR" },
  { usdt: "LINK-USDT", inr: "LINK-INR" },
  { usdt: "LTC-USDT", inr: "LTC-INR" },
  { usdt: "BNB-USDT", inr: "BNB-INR" }
];
