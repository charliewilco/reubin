import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { Auth } from "$/lib/auth";
import { Controllers } from "$/lib/controllers";

export async function PUT(_request: Request, context: { params: { id: string } }) {
	let { id } = context.params;
	const authRequest = Auth.handleRequest({ cookies });
	const { user } = await authRequest.validateUser();

	// console.log(id, "id from route");
	if (!id) {
		return NextResponse.json({ error: "Entry id not provided" }, { status: 500 });
	}

	let entry = await Controllers.entry.markAsRead(id);

	return NextResponse.json({
		data: {
			entry,
		},
	});
}
