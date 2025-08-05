import express from "express";
import { createServer } from "node:http";
import { connectToBinanceBookTicker } from "./sockets/binance.socket";

const app = express();
const server = createServer(app);
const symbols = ["CTKUSDT"];

connectToBinanceBookTicker(symbols);

export default server;
