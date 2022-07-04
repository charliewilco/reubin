import { createApp } from "./app";

const start = async () => {
	const app = createApp();

	try {
		app.listen({ port: 5300 }).then(() => {
			console.log(`\
    🚀 Server ready at: http://localhost:5300/graphiql
    ⭐️ See sample queries: http://pris.ly/e/ts/graphql-fastify#using-the-graphql-api
    `);
		});
	} catch (err) {
		app.log.error(err);
		process.exit(1);
	}
};

start();
