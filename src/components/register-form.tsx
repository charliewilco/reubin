"use client";
import { useRouter } from "next/navigation";
import { useId, useState } from "react";
import { useFormStatus } from "react-dom";
import { Label, Input, TextLabel } from "./ui/input";
import { submitRegisterForm, type RegisterFormValues } from "$/client";
import type { FieldErrors } from "$/utils/validation";

export function RegisterForm() {
	let router = useRouter();
	let { pending } = useFormStatus();
	let [errors, setErrors] = useState<FieldErrors<RegisterFormValues>>({});

	let formId = useId();

	return (
		<form
			action={(formData) =>
				submitRegisterForm(formData, {
					onSuccess(url) {
						router.push(url);
					},
					onError(errors) {
						setErrors(errors);
					},
				})
			}
			className="space-y-6">
			<div>
				<Label htmlFor="username">
					<TextLabel>Username</TextLabel>
					<Input
						disabled={pending}
						id="username"
						required
						data-testid="register-username-input"
						name="username"
						aria-invalid={!!errors["username"]}
						aria-errormessage={`err-${formId}-username}`}
					/>
					{errors["username"] && <div id={`err-${formId}-username`}>{errors["username"]}</div>}
				</Label>
			</div>

			<div>
				<Label htmlFor="email">
					<TextLabel>Email</TextLabel>
					<Input
						disabled={pending}
						id="email"
						required
						autoComplete="email"
						type="email"
						data-testid="register-email-input"
						name="email"
						aria-invalid={!!errors["email"]}
						aria-errormessage={`err-${formId}-email}`}
					/>
					{errors["email"] && <div id={`err-${formId}-email`}>{errors["email"]}</div>}
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
						data-testid="register-password-input"
						name="password"
						aria-invalid={!!errors["password"]}
						aria-errormessage={`err-${formId}-password}`}
					/>
					{errors["password"] && <div id={`err-${formId}-password`}>{errors["password"]}</div>}
				</Label>
			</div>

			<div>
				<button
					disabled={pending}
					type="submit"
					className="flex w-full justify-center rounded-md border border-transparent bg-sky-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2">
					Register
				</button>
			</div>
		</form>
	);
}
