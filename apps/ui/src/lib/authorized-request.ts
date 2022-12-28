import type { ReadonlyRequestCookies } from "next/dist/server/app-render";
import type { RequestCookies } from "next/dist/server/web/spec-extension/cookies";
import { TOKEN_NAME } from "./auth-token";
import { setHeaders } from "./graphql";

export async function authorizeRequest<TReturnValue>(
	cookies: RequestCookies | ReadonlyRequestCookies,
	request: Promise<TReturnValue>
) {
	const token = cookies.get(TOKEN_NAME)?.value;
	if (token) {
		setHeaders(token);
	}
	return request;
}
