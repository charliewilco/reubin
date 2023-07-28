import { NextResponse } from "next/server";
import { Controllers } from "$/lib/controllers";
import { Services } from "$/lib/services";

interface Params {
	id: string;
}

export async function GET(_request: Request, context: { params: Params }) {
	const { user } = await Services.getUserSession(_request);
	let id = context.params.id;
	let entries = await Controllers.entry.getByFeed(id);

	return NextResponse.json({
		data: {
			entries,
		},
	});
}
