import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { Auth } from "$/lib/auth";

export async function POST(request: Request) {
	const authRequest = Auth.handleRequest({ request, cookies });
	const { session } = await authRequest.validateUser();
	if (!session) {
		authRequest.setSession(null); // delete session cookie
		return NextResponse.json(null, {
			status: 401,
		});
	}
	await Auth.invalidateSession(session.sessionId);
	authRequest.setSession(null); // delete session cookie
	return new NextResponse(null, {
		status: 302,
		headers: {
			location: "/login",
		},
	});
}
