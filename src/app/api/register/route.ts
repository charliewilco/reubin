import { LuciaError } from "lucia-auth";
import { cookies } from "next/headers";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import base64 from "base-64";
import { Services } from "$/lib/services";

export const runtime = "nodejs";

export async function POST(request: Request) {
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
		const user = await Services.auth.createUser({
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
		const session = await Services.auth.createSession(user.userId);
		const authRequest = Services.auth.handleRequest({ request, cookies });
		authRequest.setSession(session);

		return NextResponse.redirect(new URL("/all", request.url));
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
}
