export function getSymbolFromTopic(topic: string): string {
  return topic.split(":")[1].replace("-", "");
}
