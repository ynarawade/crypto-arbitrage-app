import { SYNC_THRESHOLD_MS } from "../constants";

export function getSymbolFromTopic(topic: string): string {
  return topic.split(":")[1].replace("-", "");
}

export function isSynced(p1: number, p2: number): boolean {
  return Math.abs(p1 - p2) <= SYNC_THRESHOLD_MS;
}

export function isZebpayFresh(timestamp: number, threshold = 10000): boolean {
  return Date.now() - timestamp <= threshold;
}
