import { Auth } from "$/lib/auth";
import { LuciaError } from "lucia-auth";
import { cookies } from "next/headers";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import base64 from "base-64";

export const runtime = "nodejs";

export const POST = async (request: Request) => {
	const { username, email, password } = (await request.json()) as Partial<{
		username: string;
		password: string;
		email: string;
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
		const user = await Auth.createUser({
			primaryKey: {
				providerId: "username",
				providerUserId: username,
				password: base64.decode(password),
			},
			attributes: {
				username,
				email,
			},
		});
		const session = await Auth.createSession(user.userId);
		const authRequest = Auth.handleRequest({ request, cookies });
		authRequest.setSession(session);
		new Response(null, {
			status: 302,
			headers: {
				location: "/",
			},
		});
	} catch (error) {
		if (
			error instanceof Prisma.PrismaClientKnownRequestError &&
			error.code === "P2002" &&
			error.message?.includes("username")
		) {
			return NextResponse.json(
				{
					error: "Username already in use",
				},
				{
					status: 400,
				}
			);
		}
		if (error instanceof LuciaError && error.message === "AUTH_DUPLICATE_KEY_ID") {
			return NextResponse.json(
				{
					error: "Username already in use",
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