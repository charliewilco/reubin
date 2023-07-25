import {
	registerValidationSchema,
	loginValidationSchema,
	zodToFieldErrors,
	VALID_PASSWORD_ERROR,
} from "$/utils/validation";

describe("Register Validation", () => {
	test("should validate username, email, and password", () => {
		const validInput = {
			username: "testUser",
			email: "test@example.com",
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
		// @ts-ignore
		expect(zodToFieldErrors(result.error)).toEqual({
			email: "Invalid email",
			password: VALID_PASSWORD_ERROR,
		});
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

		// @ts-ignore
		console.log(result.error.flatten());

		// @ts-ignore
		const fieldErrors = zodToFieldErrors(result.error as Zod.ZodError);

		expect(fieldErrors).toEqual({
			password: VALID_PASSWORD_ERROR,
		});
	});
});
