import {
	registerValidationSchema,
	loginValidationSchema,
	zodToFieldErrors,
} from "$/utils/validation";

describe("registerValidationSchema", () => {
	test("should validate username, email, and password", () => {
		const validInput = {
			username: "testUser",
			email: "test@example.com",
			password: "testPassword123",
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
		});
	});
});

describe("zodToFieldErrors", () => {
	test("should convert ZodError to field errors", () => {
		const invalidInput = {
			username: "",
			password: "short",
		};

		const result = loginValidationSchema.safeParse(invalidInput);

		expect(result.success).toBe(false);

		// @ts-ignore
		const fieldErrors = zodToFieldErrors(result.error as Zod.ZodError);

		expect(fieldErrors).toEqual({
			username: "Required",
			password: "Should be at least 8 characters",
		});
	});
});
