import z from "zod";

export const loginValidationSchema = z.object({
	username: z.string(),
	password: z.string().min(8),
});

export const registerValidationSchema = z.object({
	username: z.string(),
	email: z.string().email("Invalid email"),
	password: z.string().min(8),
});

export type FieldErrors<T> = Partial<Record<keyof T, string>>;

export function zodToFieldErrors<T>(error: Zod.ZodError<T>): Partial<Record<keyof T, string>> {
	let flattened = error.flatten();

	let fieldErrors: Partial<Record<keyof T, string>> = {};

	for (let key in flattened.fieldErrors) {
		let fieldError: string[] | undefined = flattened.fieldErrors[key as keyof T];
		if (fieldError) {
			fieldErrors[key as keyof T] = fieldError.join(", ");
		}
	}

	return fieldErrors;
}
