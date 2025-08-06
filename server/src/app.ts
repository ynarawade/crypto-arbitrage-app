import express from "express";
import { createServer } from "node:http";
import { connectToBinanceBookTicker } from "./sockets/binance.socket";
import { connectToKuCoin } from "./sockets/kucoin.socket";
import { bootMyServer } from "./sockets/myServer.socket";

const app = express();
const server = createServer(app);

const symbolsKuCoin = ["TON-USDT", "BTC-USDT", "ETH-USDT", "SOL-USDT"];
const symbolsBinance = symbolsKuCoin.map((symbol) => symbol.replace("-", ""));

connectToBinanceBookTicker(symbolsBinance);
connectToKuCoin(symbolsKuCoin);
bootMyServer(server);

export default server;
