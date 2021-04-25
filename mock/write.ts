import path from "path";
import fs from "fs";

export const writeToMock = (name: string, content: any) => {
  const f = path.join(process.cwd(), "mock", name.concat(".json"));

  fs.writeFileSync(f, JSON.stringify(content, null, 2), "utf8");
};
