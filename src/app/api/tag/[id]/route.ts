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
	let tag = await Controllers.tags.getById(id, user.userId);

	return NextResponse.json({
		data: tag,
	});
}

interface TagUpdateArgs {
	title: string;
}

export async function PUT(request: Request, context: { params: Params }) {
	const authRequest = Auth.handleRequest({ request, cookies });
	const { user } = await authRequest.validateUser();
	let id = context.params.id;
	const body: TagUpdateArgs = await request.json();

	let tags = await Controllers.tags.updateById(body.title, id, user.userId);

	return NextResponse.json({
		data: tags,
	});
}
