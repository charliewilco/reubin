import { NextResponse } from "next/server";

import type { EntryFilter } from "$/lib/filters";

export async function GET() {
	let filters: EntryFilter[] = ["all", "favorite", "unread"];
	return NextResponse.json({
		data: {
			filters,
		},
	});
}
