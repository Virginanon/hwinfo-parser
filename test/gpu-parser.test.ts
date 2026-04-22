import fs from "node:fs";
import path from "node:path";
import { parseGPUData } from "../src/shared/gpu-parser.js";

it("test parseGPUData function", () => {
  expect(parseGPUData({})).toEqual({});

  const jsonStr = fs.readFileSync(path.resolve(import.meta.dirname, "../template-datas.json"), "utf8");
  expect(parseGPUData(JSON.parse(jsonStr)["getAllSensorsData"])).toMatchInlineSnapshot(`
    {
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
    }
  `);
});
