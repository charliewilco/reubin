import { Result, unwrap } from "../src";

describe("unwrap function", () => {
	test("should return the data when ok is true", () => {
		const result: Result<string> = { data: "data", ok: true };
		const unwrappedData = unwrap(result);
		expect(unwrappedData).toBe("data");
	});

	test("should throw an error when ok is false and no custom error message is provided", () => {
		const result: Result<never> = { error: "An error occurred", ok: false };
		expect(() => unwrap(result)).toThrow("An error occurred");
	});

	test("should throw an error with a custom message when ok is false and a custom error message is provided", () => {
		const result: Result<never> = { error: "An error occurred", ok: false };
		const customErrorMessage = "Custom error message";
		expect(() => unwrap(result, customErrorMessage)).toThrow(customErrorMessage);
	});

	test("should throw an error with the result error message when ok is false and a custom error message is not provided", () => {
		const result: Result<never> = { error: "An error occurred", ok: false };
		expect(() => unwrap(result)).toThrow(result.error);
	});

	test("should throw an error with the result error message when ok is false and custom error message is null", () => {
		const result: Result<never> = { error: "An error occurred", ok: false };
		// @ts-expect-error
		expect(() => unwrap(result, null)).toThrow(result.error);
	});

	test("should throw an error with the result error message when ok is false and custom error message is undefined", () => {
		const result: Result<never> = { error: "An error occurred", ok: false };
		expect(() => unwrap(result, undefined)).toThrow(result.error);
	});
});
