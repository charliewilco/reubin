import { z } from "zod";
import { VALID_PASSWORD } from "../constants";

export const passwordRegex = new RegExp(
	/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/
);

export const passwordStringSchema = z
	.string({
		required_error: "Must include password",
	})
	.regex(passwordRegex, VALID_PASSWORD);

export const createUserValidation = z.object({
	password: passwordStringSchema,
	email: z.string({ required_error: "Email is required" }).email(),
});
