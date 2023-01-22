export type Result<T, E = string> = { data: T; ok: true } | { error: E; ok: false };

export function unwrap<T, E extends string>(
	result: Result<T, E>,
	customErrorMessage?: string
): T {
	if (result.ok) {
		return result.data;
	} else {
		let message = result.error as string;

		if (customErrorMessage) {
			message = customErrorMessage;
		}

		throw new Error(message);
	}
}

export class ResultCache<T, E> {
	static unwrap = unwrap;
	private cache: Map<string | string[], Result<T, E>> = new Map();

	public get(key: string | string[]): Result<T, E> | undefined {
		return this.cache.get(key);
	}

	public set(key: string, value: Result<T, E>): void {
		this.cache.set(key, value);
	}
}
