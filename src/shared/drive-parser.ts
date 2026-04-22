import type { RawData } from "./types.js";

// ==================================================================== //
// type definitions                                                     //
// ==================================================================== //

type HardwareMetricsKeys = "read_activity" | "write_activity" | "total_activity";

export interface ParsedDriveData {
  [key: string]: {
    [Key in HardwareMetricsKeys]: { value: number; units: string };
  };
}

// ==================================================================== //

export function parseDriveData(rawData: RawData): ParsedDriveData {
  const parsedDriveData: ParsedDriveData = {};
  const hardwareNames = Object.keys(rawData);

  const driveNames = hardwareNames.filter(name => name.startsWith("Drive"));

  for (const driveName of driveNames) {
    parsedDriveData[driveName] = {
      read_activity: { value: 0, units: "%" },
      write_activity: { value: 0, units: "%" },
      total_activity: { value: 0, units: "%" },
    };

    for (const key of Object.keys(rawData[driveName]!)) {
      if (key.includes("Read Activity")) {
        parsedDriveData[driveName].read_activity = {
          value: rawData[driveName]![key]![0]!.value,
          units: rawData[driveName]![key]![0]!.units,
        };
      }
      if (key.includes("Write Activity")) {
        parsedDriveData[driveName].write_activity = {
          value: rawData[driveName]![key]![0]!.value,
          units: rawData[driveName]![key]![0]!.units,
        };
      }
      if (key.includes("Total Activity")) {
        parsedDriveData[driveName].total_activity = {
          value: rawData[driveName]![key]![0]!.value,
          units: rawData[driveName]![key]![0]!.units,
        };
      }
    }
  }

  return parsedDriveData;
}
