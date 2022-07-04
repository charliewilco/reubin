import { readFile } from "fs/promises";
import path from "path";

export const getFixtureAsString = async (filePath: string) => {
	const buffer = await readFile(path.join("test/fixtures", filePath), {
		encoding: "utf-8",
	});

	return buffer.toString();
};
