import type { RawData } from "./types.js";

// ==================================================================== //
// type definitions                                                     //
// ==================================================================== //

type HardwareMetricsKeys = "page_file_usage" | "physical_memory_load";

export interface ParsedRAMData {
  [key: string]: {
    [Key in HardwareMetricsKeys]: { value: number; units: string };
  };
}

// ==================================================================== //

export function parseRAMData(rawData: RawData): ParsedRAMData {
  const parsedRAMData: ParsedRAMData = {};
  const hardwareNames = Object.keys(rawData);

  const ramNames = hardwareNames.filter(name => name.startsWith("System"));

  for (const ramName of ramNames) {
    parsedRAMData[ramName] = {
      page_file_usage: { value: 0, units: "%" },
      physical_memory_load: { value: 0, units: "%" },
    };

    for (const key of Object.keys(rawData[ramName]!)) {
      if (key.includes("Page File Usage")) {
        parsedRAMData[ramName].page_file_usage = {
          value: rawData[ramName]![key]![0]!.value,
          units: rawData[ramName]![key]![0]!.units,
        };
      }
      if (key.includes("Physical Memory Load")) {
        parsedRAMData[ramName].physical_memory_load = {
          value: rawData[ramName]![key]![0]!.value,
          units: rawData[ramName]![key]![0]!.units,
        };
      }
    }
  }

  return parsedRAMData;
}
