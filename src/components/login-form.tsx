"use client";

import z from "zod";
import { Label, Input, TextLabel } from "./ui/input";

import { useForm } from "./ui/forms/core";

const validationSchema = z.object({
	username: z.string(),
	password: z.string().min(8),
});

interface LoginFormValues {
	username: string;
	password: string;
}

async function loginUser({ username, password }: LoginFormValues) {
	let response = await fetch("/api/login", {
		method: "POST",
		body: JSON.stringify({ username, password: window.btoa(password) }),
		headers: {
			"Content-Type": "application/json",
		},
	});

	return response.json();
}

export function LoginForm() {
	const { errors, isSubmitting, getFieldProps, getFormProps, getErrorProps } = useForm(
		{
			initialValues: {
				username: "",
				password: "",
			},
			validationSchema,
			onSubmit: loginUser,
		},
		{
			validateOnEvent: "blur",
		}
	);

	return (
		<form {...getFormProps()} className="space-y-8">
			<div>
				<Label htmlFor="username">
					<TextLabel>Username</TextLabel>
					<Input
						disabled={isSubmitting}
						id="username"
						autoComplete="username"
						required
						data-testid="login-username-input"
						{...getFieldProps("username")}
					/>
					{errors["username"] && (
						<div {...getErrorProps("username")}>{errors["username"]}</div>
					)}
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
						data-testid="login-password-input"
						{...getFieldProps("password")}
					/>
					{errors["password"] && (
						<div {...getErrorProps("password")}>{errors["password"]}</div>
					)}
				</Label>
			</div>

			<div>
				<button
					type="submit"
					disabled={isSubmitting || Object.keys(errors).length > 0}
					className="flex w-full justify-center rounded-md border border-transparent bg-sky-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2">
					Login
				</button>
			</div>
		</form>
	);
}
