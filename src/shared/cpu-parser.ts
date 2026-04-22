import type { RawData } from "./types.js";

// ==================================================================== //
// type definitions                                                     //
// ==================================================================== //

type HardwareMetricsKeys = "usage" | "temperature_percentage" | "core_max_temperature_percentage";

export interface ParsedCPUData {
  [key: string]: {
    [Key in HardwareMetricsKeys]: { value: number; units: string };
  };
}

// ==================================================================== //

export function parseCPUData(rawData: RawData): ParsedCPUData {
  const parsedCPUData: ParsedCPUData = {};
  const hardwareNames = Object.keys(rawData);

  const cpuNames = hardwareNames.filter(
    name =>
      name.startsWith("CPU") &&
      !(
        name.endsWith("C-State Residency") ||
        name.endsWith("DTS") ||
        name.endsWith("Enhanced") ||
        name.endsWith("Performance Limit Reasons")
      ),
  );

  for (const cpuName of cpuNames) {
    parsedCPUData[cpuName] = {
      usage: { value: 0, units: "%" },
      temperature_percentage: { value: 0, units: "%" },
      core_max_temperature_percentage: { value: 0, units: "%" },
    };

    // Extract Total CPU Usage
    for (const key of Object.keys(rawData[cpuName]!)) {
      if (key.includes("Total CPU Usage")) {
        parsedCPUData[cpuName].usage = {
          value: rawData[cpuName]![key]![0]!.value,
          units: rawData[cpuName]![key]![0]!.units,
        };
      }
    }

    // Extract CPU Temperature Metrics
    const cpuDTSName = hardwareNames.find(name => name.startsWith(cpuName) && name.endsWith("DTS"))!;

    let cpuPackageTemperatureValue = 0;
    let cpuCoreMaxTemperatureValue = 0;
    let cpuCore0TemperatureValue = 0;
    let cpuCore0DistanceToTjMaxValue = 0;
    for (const key of Object.keys(rawData[cpuDTSName]!)) {
      if (key.includes("CPU Package")) {
        cpuPackageTemperatureValue = rawData[cpuDTSName]![key]![0]!.value;
      }
      if (key.includes("Core 0")) {
        cpuCore0TemperatureValue = rawData[cpuDTSName]![key]![0]!.value;
      }
      if (key.includes("Core 0 Distance to TjMAX")) {
        cpuCore0DistanceToTjMaxValue = rawData[cpuDTSName]![key]![0]!.value;
      }
      if (key.includes("Core Max")) {
        cpuCoreMaxTemperatureValue = rawData[cpuDTSName]![key]![0]!.value;
      }
    }

    if (cpuCore0DistanceToTjMaxValue + cpuCore0TemperatureValue === 0) {
      parsedCPUData[cpuName].temperature_percentage = {
        value: 0,
        units: "%",
      };
      parsedCPUData[cpuName].core_max_temperature_percentage = {
        value: 0,
        units: "%",
      };
    } else {
      parsedCPUData[cpuName].temperature_percentage = {
        value: (cpuPackageTemperatureValue / (cpuCore0DistanceToTjMaxValue + cpuCore0TemperatureValue)) * 100,
        units: "%",
      };
      parsedCPUData[cpuName].core_max_temperature_percentage = {
        value: (cpuCoreMaxTemperatureValue / (cpuCore0DistanceToTjMaxValue + cpuCore0TemperatureValue)) * 100,
        units: "%",
      };
    }
  }

  return parsedCPUData;
}
