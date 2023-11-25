"use client";

import { useRouter } from "next/navigation";
import { useId, useState } from "react";
import { useFormStatus } from "react-dom";
import { Label, Input, TextLabel } from "./ui/input";
import { submitLoginForm, type LoginFormValues } from "$/client";
import type { FieldErrors } from "$/utils/validation";

export function LoginForm() {
	const router = useRouter();
	let { pending } = useFormStatus();
	let [errors, setErrors] = useState<FieldErrors<LoginFormValues>>({});

	let formId = useId();

	return (
		<form
			action={(formData) =>
				submitLoginForm(formData, {
					onSuccess: router.push,
					onError: setErrors,
				})
			}
			className="space-y-8">
			<div>
				<Label htmlFor="username">
					<TextLabel>Username</TextLabel>
					<Input
						disabled={pending}
						id="username"
						autoComplete="username"
						required
						data-testid="login-username-input"
						name="username"
						aria-invalid={!!errors["username"]}
						aria-errormessage={`err-${formId}-username}`}
					/>
					{errors["username"] && <div id={`err-${formId}-username`}>{errors["username"]}</div>}
				</Label>
			</div>

			<div>
				<Label htmlFor="password">
					<TextLabel>Password</TextLabel>
					<Input
						disabled={pending}
						id="password"
						type="password"
						autoComplete="current-password"
						required
						data-testid="login-password-input"
						name="password"
						aria-invalid={!!errors["password"]}
						aria-errormessage={`err-${formId}-password}`}
					/>
					{errors["password"] && <div id={`err-${formId}-password`}>{errors["password"]}</div>}
				</Label>
			</div>

			<div>
				<button
					type="submit"
					disabled={pending}
					className="flex w-full justify-center rounded-md border border-transparent bg-sky-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2">
					Login
				</button>
			</div>
		</form>
	);
}
