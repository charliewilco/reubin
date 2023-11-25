import { useCallback, useEffect, useRef } from "react";
import { useLatest } from "./useLatest";
import { isNumber } from "$/utils/number";

export function useInterval(
	fn: () => void,
	delay: number | undefined,
	options: {
		immediate?: boolean;
	} = {},
) {
	const { immediate } = options;

	const fnRef = useLatest(fn);
	const timerRef = useRef<NodeJS.Timer | number | null>(0);

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
