import type { Result } from "@charliewilco/toolkit";

export interface LoginFormValues {
	username: string;
	password: string;
}

export interface RegisterFormValues {
	username: string;
	email: string;
	password: string;
}

type ActionResult<T> = Result<
	{
		redirect: true;
	},
	Partial<T>
> | null;

export type RegisterFormState = ActionResult<RegisterFormValues>;
export type LoginFormState = ActionResult<LoginFormValues>;
