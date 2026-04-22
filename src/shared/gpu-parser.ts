import type { RawData } from "./types.js";

// ==================================================================== //
// type definitions                                                     //
// ==================================================================== //

type HardwareMetricsKeys = "core_load" | "memory_usage" | "fan_duty_cycle" | "temperature_percentage";

export interface ParsedGPUData {
  [key: string]: {
    [Key in HardwareMetricsKeys]: { value: number; units: string };
  };
}

// ==================================================================== //

export function parseGPUData(rawData: RawData): ParsedGPUData {
  const parsedGPUData: ParsedGPUData = {};
  const hardwareNames = Object.keys(rawData);

  const gpuNames = hardwareNames.filter(name => name.startsWith("GPU"));

  for (const gpuName of gpuNames) {
    parsedGPUData[gpuName] = {
      core_load: { value: 0, units: "%" },
      memory_usage: { value: 0, units: "MB" },
      fan_duty_cycle: { value: 0, units: "%" },
      temperature_percentage: { value: 0, units: "%" },
    };

    let gpuThermalLimitValue = 0;
    let gpuTemperatureValue = 0;
    for (const key of Object.keys(rawData[gpuName]!)) {
      if (key.includes("GPU Core Load")) {
        parsedGPUData[gpuName].core_load = {
          value: rawData[gpuName]![key]![0]!.value,
          units: rawData[gpuName]![key]![0]!.units,
        };
      }
      if (key.includes("GPU Memory Usage")) {
        parsedGPUData[gpuName].memory_usage = {
          value: rawData[gpuName]![key]![0]!.value,
          units: rawData[gpuName]![key]![0]!.units,
        };
      }
      if (key.includes("GPU Fan [Other]")) {
        parsedGPUData[gpuName].fan_duty_cycle = {
          value: rawData[gpuName]![key]![0]!.value,
          units: rawData[gpuName]![key]![0]!.units,
        };
      }
      if (key.includes("GPU Thermal Limit")) {
        gpuThermalLimitValue = rawData[gpuName]![key]![0]!.value;
      }
      if (key.includes("GPU Temperature")) {
        gpuTemperatureValue = rawData[gpuName]![key]![0]!.value;
      }
    }
    if (gpuThermalLimitValue > 0) {
      parsedGPUData[gpuName].temperature_percentage = {
        value: (gpuTemperatureValue / gpuThermalLimitValue) * 100,
        units: "%",
      };
    }
  }

  return parsedGPUData;
}
