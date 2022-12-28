"use client";

import { useRouter } from "next/navigation";
import z from "zod";
import { Label, Input, TextLabel } from "./ui/input";
import { login } from "../lib/graphql";
import { useAuthAtom } from "../hooks/useAuth";
import { useForm } from "./ui/forms/core";

const validationSchema = z.object({
	email: z.string().email("Invalid email"),
	password: z.string().min(8),
});

export function LoginForm() {
	const [, { loginWithToken }] = useAuthAtom();
	const router = useRouter();
	const { errors, isSubmitting, getFieldProps, getFormProps, getErrorProps } = useForm(
		{
			initialValues: {
				email: "",
				password: "",
			},
			validationSchema,
			onSubmit(values) {
				login(values.email, values.password).then(({ login: { user, token } }) => {
					if (user && token) {
						loginWithToken(token);
						router.push("/feeds");
					}
				});
			},
		},
		{
			validateOnEvent: "blur",
		}
	);

	return (
		<form {...getFormProps()} className="space-y-8">
			<div>
				<Label htmlFor="email">
					<TextLabel>Email</TextLabel>
					<Input
						disabled={isSubmitting}
						type="email"
						id="email"
						autoComplete="email"
						required
						data-testid="login-email-input"
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
					className="flex w-full justify-center rounded-md border border-transparent bg-sky-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2">
					Login
				</button>
			</div>
		</form>
	);
}
