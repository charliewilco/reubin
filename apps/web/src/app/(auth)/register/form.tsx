"use client";

import { Input, Label, TextLabel } from "$/components/ui/input";
import { useActionState, useId } from "react";
import { register } from "../actions";
import styles from "../form.module.css";
import type { RegisterFormState } from "../types";

export function RegisterForm() {
	let [state, dispatch, isPending] = useActionState(register, null);
	let errors = !state?.ok ? state?.error : {};
	let formId = useId();

	return (
		<form action={dispatch} className={styles.form}>
			<div>
				<Label htmlFor="username">
					<TextLabel>Username</TextLabel>
					<Input
						disabled={isPending}
						id="username"
						required
						data-testid="register-username-input"
						name="username"
						aria-invalid={!!errors?.username}
						aria-errormessage={`err-${formId}-username}`}
					/>
					{errors?.username && <div id={`err-${formId}-username`}>{errors.username}</div>}
				</Label>
			</div>

			<div>
				<Label htmlFor="email">
					<TextLabel>Email</TextLabel>
					<Input
						disabled={isPending}
						id="email"
						required
						autoComplete="email"
						type="email"
						data-testid="register-email-input"
						name="email"
						aria-invalid={!!errors?.email}
						aria-errormessage={`err-${formId}-email}`}
					/>
					{errors?.email && <div id={`err-${formId}-email`}>{errors.email}</div>}
				</Label>
			</div>

			<div>
				<Label htmlFor="password">
					<TextLabel>Password</TextLabel>
					<Input
						disabled={isPending}
						id="password"
						type="password"
						autoComplete="current-password"
						required
						data-testid="register-password-input"
						name="password"
						aria-invalid={!!errors?.password}
						aria-errormessage={`err-${formId}-password}`}
					/>
					{errors?.password && <div id={`err-${formId}-password`}>{errors.password}</div>}
				</Label>
			</div>

			<div>
				<button disabled={isPending} type="submit" className={styles.button}>
					Register
				</button>
			</div>
		</form>
	);
}
