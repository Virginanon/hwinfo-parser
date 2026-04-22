import fs from "node:fs";
import path from "node:path";
import { parseCPUData } from "../src/shared/cpu-parser.js";

it("test parseCPUData function", () => {
  expect(parseCPUData({})).toEqual({});

  const jsonStr = fs.readFileSync(path.resolve(import.meta.dirname, "../template-datas.json"), "utf8");
  expect(parseCPUData(JSON.parse(jsonStr)["getAllSensorsData"])).toMatchInlineSnapshot(`
    {
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
    }
  `);
});
