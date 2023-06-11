// lucia.d.ts
/// <reference types="lucia-auth" />
declare namespace Lucia {
	type Auth = import("./auth").AuthAdapter;
	type UserAttributes = {
		username: string;
		email: string;
	};
}
