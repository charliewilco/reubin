import { NextResponse } from "next/server";

import { Controllers } from "$/lib/controllers";
import { Services } from "$/lib/services";

interface Params {
	id: string;
}

export async function PUT(_request: Request, context: { params: Params }) {
	let { id } = context.params;
	const { user } = await Services.getUserSession(_request);

	if (!id) {
		return NextResponse.json({ error: "Entry id not provided" }, { status: 500 });
	}

	let entry = await Controllers.entry.markAsRead(id);

	return NextResponse.json({
		data: {
			entry,
		},
	});
}

export async function GET(_request: Request, _context: { params: Params }) {}
