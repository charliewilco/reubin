import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { Auth } from "$/lib/auth";
import { Controllers } from "$/lib/controllers";

interface Params {
	id: string;
}

export async function GET(request: Request, context: { params: Params }) {
	const authRequest = Auth.handleRequest({ request, cookies });
	const { user } = await authRequest.validateUser();
	let id = context.params.id;

	let entries = await Controllers.entry.getByFeed(id, user.userId);

	return NextResponse.json({
		data: {
			entries,
		},
	});
}
