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