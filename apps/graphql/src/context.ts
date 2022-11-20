import type { IncomingMessage } from "http";
import Cookies from "universal-cookie";

export interface Context {
	token: string | null;
}

export function getContext(request: IncomingMessage): Context {
	const cookies = new Cookies(request.headers.cookie ?? "");
	const parsed = cookies.getAll();

	let token: string | null = null;

	if (parsed["REUBIN_TOKEN"] || request.headers.authorization) {
		token = parsed["REUBIN_TOKEN"] ?? request.headers.authorization;
	}

	return { token };
}
