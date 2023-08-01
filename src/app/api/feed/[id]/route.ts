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
	let feed = await Controllers.feed.getById(id, user.userId);

	return NextResponse.json({
		data: {
			feed,
		},
	});
}

export type FeedIDPutArgs = {
	title: string;
};

export async function PUT(request: Request, context: { params: Params }) {
	const authRequest = Auth.handleRequest({ request, cookies });
	const { user } = await authRequest.validateUser();
	const body: FeedIDPutArgs = await request.json();

	let id = context.params.id;

	let feed = await Controllers.feed.updateTitle(id, body.title, user.userId);

	return NextResponse.json({
		data: {
			feed,
		},
	});
}

export type FeedIDPostArgs = {
	tagId: number;
};

export async function POST(request: Request, context: { params: Params }) {
	const authRequest = Auth.handleRequest({ request, cookies });
	const { user } = await authRequest.validateUser();
	const body: FeedIDPostArgs = await request.json();
	let id = context.params.id;

	let feed = await Controllers.feed.attachTag(id, body.tagId.toString(), user.userId);

	return NextResponse.json({
		data: {
			feed,
		},
	});
}

export async function DELETE(request: Request, context: { params: Params }) {
	const authRequest = Auth.handleRequest({ request, cookies });
	const { user } = await authRequest.validateUser();
	let id = context.params.id;

	let feed = await Controllers.feed.remove(id, user.userId);

	return NextResponse.json({
		data: {
			feed,
		},
	});

}
