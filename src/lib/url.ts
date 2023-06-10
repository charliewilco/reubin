export function getGraphQLEndpoint() {
	const fallbackURL = "http://localhost:3000/graphql";
	if (process.env.NODE_ENV === "test") {
		return "http://localhost:3000/graphql";
	} else if (!process.env.BROWSER) {
		return "http://localhost:3000/graphql";
	} else {
		return fallbackURL;
	}
}
