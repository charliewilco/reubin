import { cookies } from "next/headers";
import { TOKEN_NAME } from "./auth-token";
import { setHeaders } from "./graphql";

export async function authorizeRequest<TReturnValue>(
	_cookies: ReturnType<typeof cookies>,
	request: Promise<TReturnValue>
) {
	const token = _cookies.get(TOKEN_NAME)?.value;
	if (token) {
		setHeaders(token);
	}
	return request;
}
