import { NextResponse } from "next/server";
import { Controllers } from "$/lib/controllers";
import { Services } from "$/lib/services";

export async function GET(_request: Request) {
	const { user } = await Services.getUserSession(_request);

	let tags = await Controllers.tags.getAll(user?.userId);

	return NextResponse.json({
		data: tags,
	});
}

interface TagCreateArgs {
	title: string;
}

export async function POST(request: Request) {
	const { user } = await Services.getUserSession(request);
	const body: TagCreateArgs = await request.json();

	let tags = await Controllers.tags.add(body.title, user?.userId);

	return NextResponse.json({
		data: tags,
	});
}
