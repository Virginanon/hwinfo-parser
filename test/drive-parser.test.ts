import fs from "node:fs";
import path from "node:path";
import { parseDriveData } from "../src/shared/drive-parser.js";

it("test parseDriveData function", () => {
  expect(parseDriveData({})).toEqual({});

  const jsonStr = fs.readFileSync(path.resolve(import.meta.dirname, "../template-datas.json"), "utf8");
  expect(parseDriveData(JSON.parse(jsonStr)["getAllSensorsData"])).toMatchInlineSnapshot(`
    {
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
    }
  `);
});
