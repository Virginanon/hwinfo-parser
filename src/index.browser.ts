import { parseData, type ParsedData } from "./shared/parser.js";

type ServiceFn = (...args: any[]) => any;
type NotifyFn<T> = (data: T) => void;

interface PublishFn {
  <T>(name: string): NotifyFn<T>;
  (name: string, service: ServiceFn): void;
}

export type HWInfoUpdatedData = ParsedData;

export function HWInfo(publish: PublishFn) {
  const ws = new WebSocket("ws://localhost:15500");

  const notifyHWInfoUpdated = publish<HWInfoUpdatedData>("onHWInfoUpdated");

  ws.onopen = () => {
    console.log("HWInfo Services WebSocket connection established");
  };
  ws.onerror = error => {
    console.error("HWInfo Services WebSocket error:", error);
  };

  ws.onmessage = message => {
    notifyHWInfoUpdated(parseData(message.data));
  };
}
