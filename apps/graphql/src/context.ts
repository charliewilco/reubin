import type { IncomingMessage } from "http";
import Cookies from "universal-cookie";

export interface Context {
	token: string | null;
}

export function getContext(request: IncomingMessage): Context {
	const cookies = new Cookies(request.headers.cookie ?? "");
	const parsed = cookies.getAll<{ REUBIN_TOKEN?: string }>();

	let token: string | null = null;

	if (parsed["REUBIN_TOKEN"]) {
		token = parsed["REUBIN_TOKEN"];
	}

	if (request.headers.authorization) {
		token = request.headers.authorization;
	}

	return { token };
}
