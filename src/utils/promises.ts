export function delay(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

export function wrapPromise<T>(promise: Promise<T>) {
	let status = "pending";
	let result: null | T | Error = null;
	let suspender = promise.then(
		(res) => {
			status = "success";
			result = res;
		},
		(err) => {
			status = "error";
			result = err;
		}
	);
	return {
		read() {
			if (status === "pending") {
				throw suspender;
			} else if (status === "error") {
				throw result;
			}
			return result;
		},
	};
}
