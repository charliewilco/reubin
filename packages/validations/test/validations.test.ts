import { describe, expect, test } from "vitest";
import { loginValidationSchema, registerValidationSchema, VALID_PASSWORD_ERROR } from "../src";

describe("Register Validation", () => {
	test("should validate username, email, and password", () => {
		const validInput = {
			username: "testUser",
			email: "something@emial.com",
			password: "Passw0rd!",
		};

		const result = registerValidationSchema.safeParse(validInput);

		expect(result.success).toBe(true);
	});

	test("should invalidate invalid email", () => {
		const invalidInput = {
			username: "testUser",
			email: "not an email",
			password: "testPassword123",
		};

		const result = registerValidationSchema.safeParse(invalidInput);

		expect(result.success).toBe(false);

		expect(result.error?.formErrors.fieldErrors.email).toContain("Invalid email");
		expect(result.error?.formErrors.fieldErrors.password).toContain(VALID_PASSWORD_ERROR);
	});
});

describe("Login Validation", () => {
	test("should convert ZodError to field errors", () => {
		const invalidInput = {
			username: "",
			password: "short",
		};

		const result = loginValidationSchema.safeParse(invalidInput);

		expect(result.success).toBe(false);

		expect(result.error?.formErrors.fieldErrors.password).toContain(VALID_PASSWORD_ERROR);
	});
});
