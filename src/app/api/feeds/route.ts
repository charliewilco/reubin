import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { Controllers } from "$/lib/controllers";
import { prisma } from "$/lib/orm";

export async function GET(request: Request) {
	const { user } = await Controllers.session.getUserSession(cookies, request);

	let feeds = await prisma.feed.findMany({
		where: {
			userId: user?.userId,
		},
	});

	return NextResponse.json({
		data: {
			feeds,
		},
	});
}
