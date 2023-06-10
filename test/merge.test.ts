import { deepMerge, isObject } from "../src/lib/merge";

describe("deepMerge", () => {
	test("should merge two simple objects", () => {
		const a = { x: 1, y: 2 };
		const b = { y: 3, z: 4 };
		const expected = { x: 1, y: 3, z: 4 };
		expect(deepMerge(a, b)).toEqual(expected);
	});

	test("should merge nested objects", () => {
		const a = { x: 1, y: { a: 2 } };
		const b = { y: { b: 3 }, z: 4 };
		const expected = { x: 1, y: { a: 2, b: 3 }, z: 4 };
		expect(deepMerge(a, b)).toEqual(expected);
	});

	test("should not merge arrays", () => {
		const a = { x: 1, y: [1, 2, 3] };
		const b = { y: [4, 5, 6], z: 4 };
		const expected = { x: 1, y: [4, 5, 6], z: 4 };
		expect(deepMerge(a, b)).toEqual(expected);
	});

	test("should return the second object if the first one is null or undefined", () => {
		const a = null;
		const b = { y: 3, z: 4 };
		const expected = { y: 3, z: 4 };
		// @ts-expect-error
		expect(deepMerge(a, b)).toEqual(expected);

		const c = undefined;
		// @ts-expect-error
		expect(deepMerge(c, b)).toEqual(expected);
	});
});

describe("isObject", () => {
	test("should return true for objects", () => {
		expect(isObject({})).toBe(true);
		expect(isObject(new Object())).toBe(true);
	});

	test("should return false for non-objects", () => {
		expect(isObject(null)).toBe(false);
		expect(isObject(undefined)).toBe(false);
		expect(isObject(0)).toBe(false);
		expect(isObject("")).toBe(false);
		expect(isObject([])).toBe(false);
	});
});
