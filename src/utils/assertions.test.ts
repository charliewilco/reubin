import { isObject } from "./assertions";

describe("Assertions", () => {
	test("objects", () => {
		expect(isObject({})).toBe(true);
		expect(isObject([])).toBe(false);
		expect(isObject("")).toBe(false);
	});
});
