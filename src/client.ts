import {
	loginValidationSchema,
	registerValidationSchema,
	zodToFieldErrors,
} from "$/utils/validation";

interface AuthCallback<T> {
	onSuccess(url: string): void;
	onError(errors: Partial<T>): void;
}

export interface LoginFormValues {
	username: string;
	password: string;
}

/**
 * @deprecated Consider refactoring to use a server action instead
 * @param formData
 * @param cb {AuthCallback<LoginFormValues>}
 * @returns
 */
export async function submitLoginForm(formData: FormData, cb: AuthCallback<LoginFormValues>) {
	let username = formData.get("username")?.toString();
	let password = formData.get("password")?.toString();

	let result = await loginValidationSchema.safeParseAsync({ username, password });
	if (!result.success) {
		cb.onError(zodToFieldErrors(result.error));
		return;
	}

	let response = await fetch("/api/login", {
		method: "POST",
		body: JSON.stringify({ ...result.data, password: window.btoa(result.data.password) }),
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (response.redirected) {
		return cb.onSuccess(response.url);
	}
}

export interface RegisterFormValues {
	username: string;
	email: string;
	password: string;
}

/**
 * @deprecated Consider refactoring to use a server action instead
 * @param formData
 * @param cb {AuthCallback<RegisterFormValues>}
 * @returns
 */
export async function submitRegisterForm(
	formData: FormData,
	cb: AuthCallback<RegisterFormValues>,
) {
	let username = formData.get("username")?.toString();
	let email = formData.get("email")?.toString();
	let password = formData.get("password")?.toString();

	let result = await registerValidationSchema.safeParseAsync({ username, email, password });

	if (!result.success) {
		console.log(result.error);
		cb.onError(zodToFieldErrors(result.error));
		return;
	}

	let response = await fetch("/api/register", {
		method: "POST",
		body: JSON.stringify({ ...result.data, password: window.btoa(result.data.password) }),
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (response.redirected) {
		return cb.onSuccess(response.url);
	}
}
