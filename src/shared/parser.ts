import type { RawData } from "./types.js";
import { type ParsedCPUData, parseCPUData } from "./cpu-parser.js";
import { type ParsedGPUData, parseGPUData } from "./gpu-parser.js";
import { type ParsedDriveData, parseDriveData } from "./drive-parser.js";
import { type ParsedRAMData, parseRAMData } from "./ram-parser.js";

export interface ParsedData {
  CPU: ParsedCPUData;
  GPU: ParsedGPUData;
  Drive: ParsedDriveData;
  RAM: ParsedRAMData;
}

export function parseData(jsonStr: string): ParsedData {
  const rawData: RawData = JSON.parse(jsonStr)["getAllSensorsData"];
  return {
    CPU: parseCPUData(rawData),
    GPU: parseGPUData(rawData),
    Drive: parseDriveData(rawData),
    RAM: parseRAMData(rawData),
  };
}
