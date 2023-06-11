/* eslint-disable react-hooks/rules-of-hooks */
import { Auth } from "$/lib/auth";
import base64 from "base-64";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { LuciaError } from "lucia-auth";

export const POST = async (request: Request) => {
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
		const authRequest = Auth.handleRequest({ request, cookies });
		const key = await Auth.useKey("username", username, base64.decode(password));
		const session = await Auth.createSession(key.userId);
		authRequest.setSession(session);
		return new Response(null, {
			status: 302,
			headers: {
				location: "/",
			},
		});
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
};
