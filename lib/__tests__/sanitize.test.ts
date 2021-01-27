import { it, describe, expect } from "@jest/globals";
import fs from "fs";
import { join } from "path";
import { getContent } from "../html";
const path = join(__dirname, "fixtures/content.html");

describe("HTML", () => {
  it("returns pre tag without children", async () => {
    const content = getContent(fs.readFileSync(path, "utf8"));
    expect(typeof content).toBe("string");
  });
});
