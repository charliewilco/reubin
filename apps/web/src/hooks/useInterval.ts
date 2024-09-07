import Utils from "@r/utils";
import { useCallback, useEffect, useRef } from "react";
import { useLatest } from "./useLatest";

export function useInterval(
	fn: () => void,
	delay: number | undefined,
	options: {
		immediate?: boolean;
	} = {},
) {
	const { immediate } = options;

	let fnRef = useLatest(fn);
	let timerRef = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		if (!Utils.Number.isNumber(delay) || delay < 0) {
			return;
		}
		if (immediate) {
			fnRef.current();
		}
		timerRef.current = setInterval(() => {
			fnRef.current();
		}, delay);
		return () => {
			if (timerRef.current !== null && Utils.Number.isNumber(timerRef.current)) {
				clearInterval(timerRef.current);
			}
		};
	}, [delay, immediate, fnRef]);

	let clear = useCallback(() => {
		if (timerRef.current !== null && Utils.Number.isNumber(timerRef.current)) {
			clearInterval(timerRef.current);
		}
	}, []);

	return clear;
}
