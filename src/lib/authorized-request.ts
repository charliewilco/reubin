import { cookies } from "next/headers";
import { TOKEN_NAME } from "./auth-token";
import { setHeaders } from "./graphql";

export async function authorizeRequest<TReturnValue>(request: Promise<TReturnValue>) {
	let token = cookies().get(TOKEN_NAME)?.value;
	if (token) {
		setHeaders(token);
	}
	return request;
}
