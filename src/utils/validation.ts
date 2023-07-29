import z from "zod";

export const passwordRegex = new RegExp(
	/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
);

export const VALID_PASSWORD_ERROR = `Password, must contain 1 lowercase and 1 uppercase letter, 1 number, 1 special character, and be at least 8 characters. Also, must not reveal the location of the Soul Stone.`;

export const loginValidationSchema = z.object({
	username: z.string({ required_error: "Username is required" }),
	password: z.string().regex(passwordRegex, VALID_PASSWORD_ERROR),
});

export const registerValidationSchema = z.object({
	username: z.string({
		required_error: "Username is required",
		invalid_type_error: "Username must be a string",
	}),
	email: z.string().email("Invalid email"),
	password: z.string().regex(passwordRegex, VALID_PASSWORD_ERROR),
});

export type FieldErrors<T> = Partial<Record<keyof T, string>>;

/**
 * @deprecated Use `error.flatten()` instead and iterate over `error.fieldErrors`
 */
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

export async function parseFormData<T>(
	formData: FormData,
	schema: Zod.ZodSchema<T>
): Promise<T> {
	const object: any = {};
	for (let [key, value] of formData.entries()) {
		object[key] = value;
	}
	return schema.parse(object);
}

type Action<T> = (formData: FormData) => T;

export async function validatedAction<T>(action: Action<T>, schema: Zod.ZodSchema<T>) {
	return async (formData: FormData) => {
		const validatedData: any = parseFormData(formData, schema);
		const newFormData = new FormData();

		for (const key in validatedData) {
			newFormData.append(key, validatedData[key]);
		}

		return action(newFormData);
	};
}
