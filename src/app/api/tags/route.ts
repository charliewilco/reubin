import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { Controllers } from "$/lib/controllers";

export async function GET(request: Request) {
	const { user } = await Controllers.session.getUserSession(cookies, request);

	let tags = await Controllers.tags.getAll(user?.userId);

	return NextResponse.json({
		data: tags,
	});
}

interface TagCreateArgs {
	title: string;
}

export async function POST(request: Request) {
	const { user } = await Controllers.session.getUserSession(cookies, request);
	const body: TagCreateArgs = await request.json();

	let tags = await Controllers.tags.add(body.title, user?.userId);

	return NextResponse.json({
		data: tags,
	});
}
