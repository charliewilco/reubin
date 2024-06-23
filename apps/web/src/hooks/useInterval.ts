import { isNumber } from "$/utils/number";
import { useCallback, useEffect, useRef } from "react";
import { useLatest } from "./useLatest";

type Interval = ReturnType<typeof setInterval> | null;

export function useInterval(
	fn: () => void,
	delay: number | undefined,
	options: {
		immediate?: boolean;
	} = {},
) {
	const { immediate } = options;

	const fnRef = useLatest(fn);
	const timerRef = useRef<Interval>(null);

	useEffect(() => {
		if (!isNumber(delay) || delay < 0) {
			return;
		}
		if (immediate) {
			fnRef.current();
		}
		timerRef.current = setInterval(() => {
			fnRef.current();
		}, delay);
		return () => {
			if (timerRef.current !== null && isNumber(timerRef.current)) {
				clearInterval(timerRef.current);
			}
		};
	}, [delay, immediate, fnRef]);

	const clear = useCallback(() => {
		if (timerRef.current !== null && isNumber(timerRef.current)) {
			clearInterval(timerRef.current);
		}
	}, []);

	return clear;
}
