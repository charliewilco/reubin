import { Services } from "$/lib/services";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
	const { user } = await Services.getUserSession(request);

	let feeds = await Services.db.feed.findMany({
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
