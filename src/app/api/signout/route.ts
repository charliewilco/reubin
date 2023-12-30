import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { Services } from "$/lib/services";

export async function POST(request: Request) {
	const authRequest = Services.auth.handleRequest({ request, cookies });
	const { session } = await authRequest.validateUser();
	if (!session) {
		return NextResponse.json(null, {
			status: 401,
		});
	}
	await Services.auth.invalidateSession(session.sessionId);
	authRequest.setSession(null); // delete session cookie
	return new Response(null, {
		status: 302,
		headers: {
			location: "/login",
		},
	});
}
