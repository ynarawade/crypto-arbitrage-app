import axios from "axios";

export const KUCOIN_BASE_STREAM = "wss://ws-api-spot.kucoin.com";
export const KUCOIN_BASE_URL = "https://api.kucoin.com/api/v1/bullet-public"; // for getting public token

export async function getKuCoinTickerUrl(): Promise<string> {
  try {
    const res = await axios.post(KUCOIN_BASE_URL);
    console.log("RES---", res);

    const token = res?.data?.data?.token;
    return `${KUCOIN_BASE_STREAM}?token=${token}`;
  } catch (error) {
    throw new Error(`${error}`);
  }
}
