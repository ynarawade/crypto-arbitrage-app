import express from "express";
import { createServer } from "node:http";
import { connectToBinanceBookTicker } from "./sockets/binance.socket";
import { connectToKuCoin } from "./sockets/kucoin.socket";

const app = express();
const server = createServer(app);

const symbolsKuCoin = ["TON-USDT"];
const symbolsBinance = symbolsKuCoin.map((symbol) => symbol.replace("-", ""));



// connectToBinanceBookTicker(symbols);
// connectToKuCoin(symbolsKuCoin);

export default server;
