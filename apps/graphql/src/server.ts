import { createApp } from "./app";

const start = async () => {
	try {
		const { url } = await createApp();
		console.log(`🚀  Server ready at ${url}`);
	} catch (err) {
		console.error(err);
		process.exit(1);
	}
};

start();
