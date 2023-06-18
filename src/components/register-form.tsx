"use client";

import z from "zod";
import { Label, Input, TextLabel } from "./ui/input";
import { useForm } from "./ui/forms/core";

const validationSchema = z.object({
	username: z.string(),
	email: z.string().email("Invalid email"),
	password: z.string().min(8),
});

interface RegisterFormValues {
	username: string;
	email: string;
	password: string;
}

async function registerUser({ username, email, password }: RegisterFormValues) {
	let response = await fetch("/api/register", {
		method: "POST",
		body: JSON.stringify({ email, username, password: window.btoa(password) }),
		headers: {
			"Content-Type": "application/json",
		},
	});

	return response.json();
}

export function RegisterForm() {
	const { errors, isSubmitting, getFieldProps, getFormProps, getErrorProps } = useForm(
		{
			initialValues: {
				username: "",
				email: "",
				password: "",
			},
			validationSchema,
			onSubmit(values) {
				return registerUser(values);
			},
		},
		{
			validateOnEvent: "blur",
		}
	);

	return (
		<form {...getFormProps()} className="space-y-6">
			<div>
				<Label htmlFor="username">
					<TextLabel>Username</TextLabel>
					<Input
						disabled={isSubmitting}
						id="username"
						required
						data-testid="register-username-input"
						{...getFieldProps("username")}
					/>
					{errors["username"] && (
						<div {...getErrorProps("username")}>{errors["username"]}</div>
					)}
				</Label>
			</div>

			<div>
				<Label htmlFor="email">
					<TextLabel>Email</TextLabel>
					<Input
						disabled={isSubmitting}
						id="email"
						required
						autoComplete="email"
						type="email"
						data-testid="register-email-input"
						{...getFieldProps("email")}
					/>
					{errors["email"] && <div {...getErrorProps("email")}>{errors["email"]}</div>}
				</Label>
			</div>

			<div>
				<Label htmlFor="password">
					<TextLabel>Password</TextLabel>
					<Input
						disabled={isSubmitting}
						id="password"
						type="password"
						autoComplete="current-password"
						required
						data-testid="register-password-input"
						{...getFieldProps("password")}
					/>
					{errors["password"] && (
						<div {...getErrorProps("password")}>{errors["password"]}</div>
					)}
				</Label>
			</div>

			<div>
				<button
					disabled={isSubmitting || Object.keys(errors).length > 0}
					type="submit"
					className="flex w-full justify-center rounded-md border border-transparent bg-sky-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2">
					Register
				</button>
			</div>
		</form>
	);
}
