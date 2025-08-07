import express from "express";
import { createServer } from "node:http";
import { connectToBinanceBookTicker } from "./sockets/binance.socket";
import { connectToKuCoin } from "./sockets/kucoin.socket";
import { bootMyServer } from "./sockets/myServer.socket";
import { connectToZebpaySocket } from "./sockets/zebpay.socket";
import { USDT_INR_PAIRS } from "./constants";

const app = express();
const server = createServer(app);

const symbolsKuCoin = USDT_INR_PAIRS.map((symbol)=>symbol.usdt);
const symbolsZebpay = [ "USDT-INR",...USDT_INR_PAIRS.map(symbol => symbol.inr)];
const symbolsBinance = USDT_INR_PAIRS.map((symbol) => symbol.usdt.replace("-", ""));


connectToZebpaySocket(symbolsZebpay);
connectToBinanceBookTicker(symbolsBinance);
connectToKuCoin(symbolsKuCoin);
bootMyServer(server);

export default server;
