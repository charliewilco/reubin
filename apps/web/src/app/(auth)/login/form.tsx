"use client";

import { useActionState, useId } from "react";
import { Input, Label, TextLabel } from "../../../components/ui/input";
import { loginTemp as login } from "../actions";
import styles from "../form.module.css";

export function LoginForm() {
	let [state, dispatch, isPending] = useActionState(login, null);
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
						autoComplete="username"
						required
						data-testid="login-username-input"
						name="username"
						aria-invalid={!!errors?.username}
						aria-errormessage={`err-${formId}-username}`}
					/>
					{errors?.username && <div id={`err-${formId}-username`}>{errors.username}</div>}
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
						data-testid="login-password-input"
						name="password"
						aria-invalid={!!errors?.password}
						aria-errormessage={`err-${formId}-password}`}
					/>
					{errors?.password && <div id={`err-${formId}-password`}>{errors.password}</div>}
				</Label>
			</div>

			<div>
				<button type="submit" disabled={isPending} className={styles.button}>
					Login
				</button>
			</div>
		</form>
	);
}
