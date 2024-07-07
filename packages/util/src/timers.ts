export function createInterval(handler: () => void, ms: number) {
	const controller = new AbortController();
	const signal = controller.signal;

	const wrappedHandler = () => {
		try {
			handler();
		} catch (error) {
			console.error("Error in interval handler:", error);
			// Optionally clear the interval if an error occurs
			clearInterval(interval);
		}
	};

	const interval = setInterval(wrappedHandler, ms);
	const abortHandler = () => {
		clearInterval(interval);
	};
	signal.addEventListener("abort", abortHandler);

	return {
		controller,
		clear: () => {
			clearInterval(interval);
			signal.removeEventListener("abort", abortHandler);
		},
	};
}

export function createTimeout(handler: () => void, ms: number) {
	const controller = new AbortController();
	const signal = controller.signal;

	const timeout = setTimeout(() => {
		try {
			handler();
		} catch (error) {
			console.error("Error in timeout handler:", error);
		}
	}, ms);

	const abortHandler = () => {
		clearTimeout(timeout);
	};

	signal.addEventListener("abort", abortHandler);

	return {
		controller,
		clear: () => {
			clearTimeout(timeout);
			signal.removeEventListener("abort", abortHandler);
		},
	};
}
