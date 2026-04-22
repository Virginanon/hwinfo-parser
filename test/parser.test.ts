import fs from "node:fs";
import path from "node:path";
import { parseData } from "../src/shared/parser.js";

it("test parseData function", () => {
  expect(parseData(JSON.stringify({ getAllSensorsData: {} }))).toEqual({ CPU: {}, GPU: {}, Drive: {}, RAM: {} });

  const jsonStr = fs.readFileSync(path.resolve(import.meta.dirname, "../template-datas.json"), "utf8");
  expect(parseData(jsonStr)).toMatchInlineSnapshot(`
    {
      "CPU": {
        "CPU [#0]: Intel Core i5-10400F": {
          "core_max_temperature_percentage": {
            "units": "%",
            "value": 88,
          },
          "temperature_percentage": {
            "units": "%",
            "value": 87,
          },
          "usage": {
            "units": "%",
            "value": 77.3809523809524,
          },
        },
      },
      "Drive": {
        "Drive: PM991a NVMe Samsung 512GB (S65ZNF0T266703) [C:, E:, F:]": {
          "read_activity": {
            "units": "%",
            "value": 0.761,
          },
          "total_activity": {
            "units": "%",
            "value": 5.6,
          },
          "write_activity": {
            "units": "%",
            "value": 4.838,
          },
        },
        "Drive: WDC WD5000AZLX-08K2TA0 (WD-WCC6Z7YRXJLL) [D:]": {
          "read_activity": {
            "units": "%",
            "value": 0,
          },
          "total_activity": {
            "units": "%",
            "value": 0,
          },
          "write_activity": {
            "units": "%",
            "value": 0,
          },
        },
      },
      "GPU": {
        "GPU [#0]: NVIDIA Quadro P600": {
          "core_load": {
            "units": "%",
            "value": 40,
          },
          "fan_duty_cycle": {
            "units": "%",
            "value": 46,
          },
          "memory_usage": {
            "units": "%",
            "value": 57.265472412109375,
          },
          "temperature_percentage": {
            "units": "%",
            "value": 72.3644578313253,
          },
        },
      },
      "RAM": {
        "System: DELL OptiPlex 7080": {
          "page_file_usage": {
            "units": "%",
            "value": 17.089212629526603,
          },
          "physical_memory_load": {
            "units": "%",
            "value": 60.7,
          },
        },
      },
    }
  `);
});
