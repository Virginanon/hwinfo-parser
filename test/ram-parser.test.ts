import fs from "node:fs";
import path from "node:path";
import { parseRAMData } from "../src/shared/ram-parser.js";

it("test parseRAMData function", () => {
  expect(parseRAMData({})).toEqual({});

  const jsonStr = fs.readFileSync(path.resolve(import.meta.dirname, "../template-datas.json"), "utf8");
  expect(parseRAMData(JSON.parse(jsonStr)["getAllSensorsData"])).toMatchInlineSnapshot(`
    {
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
    }
  `);
});
