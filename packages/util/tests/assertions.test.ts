import { describe, expect, test } from "vitest";
import { isObject } from "../src/assertions";

describe("Assertions", () => {
	test("objects", () => {
		expect(isObject({})).toBe(true);
		expect(isObject([])).toBe(false);
		expect(isObject("")).toBe(false);
	});
});
