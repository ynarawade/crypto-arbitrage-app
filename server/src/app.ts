import express from "express";
import { createServer } from "node:http";
import { connectToBinanceBookTicker } from "./sockets/binance.socket";
import { connectToKuCoin } from "./sockets/kucoin.socket";
import { bootMyServer } from "./sockets/myServer.socket";
import { connectToZebpaySocket } from "./sockets/zebpay.socket";

const app = express();
const server = createServer(app);

const symbolsKuCoin = ["TON-USDT", "BTC-USDT", "ETH-USDT", "SOL-USDT"];
const symbolsZebpay = ["TON-INR", "BTC-INR", "ETH-INR", "SOL-INR","USDT-INR"];
const symbolsBinance = symbolsKuCoin.map((symbol) => symbol.replace("-", ""));

connectToZebpaySocket(symbolsZebpay);
// connectToBinanceBookTicker(symbolsBinance);
// connectToKuCoin(symbolsKuCoin);
// bootMyServer(server);

export default server;
