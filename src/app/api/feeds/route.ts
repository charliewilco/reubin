import { cookies } from "next/headers";
import { ORM } from "$/lib/orm";
import { Auth } from "$/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
	const authRequest = Auth.handleRequest({ cookies });
	const { user } = await authRequest.validateUser();

	let feeds = await ORM.feed.findMany({
		where: {
			userId: user.userId,
		},
	});

	return NextResponse.json({
		data: {
			feeds,
		},
	});
}
