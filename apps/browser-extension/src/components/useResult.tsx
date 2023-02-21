import type { Result } from "@charliewilco/toolkit/result";
import { useCallback, useEffect, useMemo, useState, useRef } from "react";

const m = new Map<string | string[], Result<RSSLink[]>>();

export function useAsyncResult(
	key: string | string[],
	promise: (key: string | string[]) => Promise<RSSLink[]>
) {
	const hasFired = useRef(false);
	const [_, forceUpdate] = useState(0);
	const result = m.get(key) ?? null;

	const firePromise = useCallback(async () => {
		if (result) {
			forceUpdate(Date.now());
			return;
		}
		try {
			const data = await promise(key);
			m.set(key, {
				ok: true,
				data,
			});
		} catch (error) {
			m.set(key, {
				ok: false,
				error: error as any,
			});
		} finally {
			hasFired.current = true;
			forceUpdate(Date.now());
		}
	}, [promise]);

	useEffect(() => {
		if (!hasFired.current) {
			firePromise();
		}
	}, [firePromise]);

	const loading = useMemo(() => result === null, [_]);

	const retry = useCallback(() => {
		m.delete(key);
		firePromise();
	}, []);

	return {
		hasFired: hasFired.current,
		get data() {
			if (result?.ok) {
				return result.data;
			}
		},
		loading,
		get error() {
			if (!result?.ok) {
				return result?.error;
			}
		},
		retry,
	};
}
