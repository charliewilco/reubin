import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { Controllers } from "$/lib/controllers";

interface Params {
	id: string;
}

export async function GET(_request: Request, context: { params: Params }) {
	const { user } = await Controllers.session.getUserSession(cookies, _request);
	let id = context.params.id;
	let entries = await Controllers.entry.getByFeed(id);

	return NextResponse.json({
		data: {
			entries,
		},
	});
}
