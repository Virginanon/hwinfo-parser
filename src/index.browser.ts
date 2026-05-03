import { type PublishFn } from 'craft-plugin-dev';
import { parseData, type ParsedData } from './shared/parser.js';

export type HWInfoUpdatedData = ParsedData;

export function HWInfo(publish: PublishFn) {
  const ws = new WebSocket('ws://localhost:15500');

  const notifyHWInfoUpdated = publish<HWInfoUpdatedData>('onHWInfoUpdated');

  ws.onopen = () => {
    console.log('HWInfo Services WebSocket connection established');
  };
  ws.onerror = error => {
    console.error('HWInfo Services WebSocket error:', error);
  };

  ws.onmessage = message => {
    notifyHWInfoUpdated(parseData(message.data));
  };
}
