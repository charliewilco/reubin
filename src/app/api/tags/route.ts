import { NextResponse } from "next/server";
import { getUserSession } from "$/lib/auth";
import { Controllers } from "$/lib/controllers";

export async function GET(_request: Request) {
	const { user } = await getUserSession();

	let tags = await Controllers.tags.getAll(user.userId);

	return NextResponse.json({
		data: tags,
	});
}

interface TagCreateArgs {
	title: string;
}

export async function POST(request: Request) {
	const { user } = await getUserSession();
	const body: TagCreateArgs = await request.json();

	let tags = await Controllers.tags.add(body.title, user.userId);

	return NextResponse.json({
		data: tags,
	});
}
