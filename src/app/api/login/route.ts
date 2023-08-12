/* eslint-disable react-hooks/rules-of-hooks */
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { LuciaError } from "lucia-auth";
import { Services } from "$/lib/services";
import * as base64 from "$/utils/base-64";

export async function POST(request: Request) {
	const { username, password } = (await request.json()) as Partial<{
		username: string;
		password: string;
	}>;
	if (!username || !password) {
		return NextResponse.json(
			{
				error: "Invalid input",
			},
			{
				status: 400,
			}
		);
	}

	try {
		const authRequest = Services.auth.handleRequest({ request, cookies });
		const key = await Services.auth.useKey("username", username, base64.decode(password));
		const session = await Services.auth.createSession(key.userId);
		authRequest.setSession(session);

		return NextResponse.redirect(new URL("/all", request.url));
	} catch (error) {
		if (
			(error instanceof LuciaError && error.message === "AUTH_INVALID_KEY_ID") ||
			(error instanceof LuciaError && error.message === "AUTH_INVALID_PASSWORD")
		) {
			return NextResponse.json(
				{
					error: "Incorrect username or password",
				},
				{
					status: 400,
				}
			);
		}
		// database connection error
		console.log(error);
		return NextResponse.json(
			{
				error: "Unknown error occurred",
			},
			{
				status: 500,
			}
		);
	}
}
