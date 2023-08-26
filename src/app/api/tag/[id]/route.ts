import { NextResponse } from "next/server";
import { Controllers } from "$/lib/controllers";
import { cookies } from "next/headers";

interface Params {
	id: string;
}

export async function GET(request: Request, context: { params: Params }) {
	const { user } = await Controllers.session.getUserSession(cookies, request);
	let id = context.params.id;
	let tag = await Controllers.tags.getById(id, user?.userId);

	return NextResponse.json({
		data: tag,
	});
}

interface TagUpdateArgs {
	title: string;
}

export async function PUT(request: Request, context: { params: Params }) {
	const { user } = await Controllers.session.getUserSession(cookies, request);
	let id = context.params.id;
	const body: TagUpdateArgs = await request.json();

	let tags = await Controllers.tags.updateById(body.title, id, user?.userId);

	return NextResponse.json({
		data: tags,
	});
}
