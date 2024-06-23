import { isNumber } from "$/utils/number";
import { useEffect, useRef } from "react";

type Timeout = ReturnType<typeof setTimeout> | null;

export function useTimeout(cb: () => void, delay = 1000) {
	const timerRef = useRef<Timeout>(null);

	useEffect(() => {
		timerRef.current = setTimeout(() => {
			cb();
		}, delay);

		return () => {
			if (isNumber(timerRef.current)) {
				clearTimeout(timerRef.current);
			}
		};
	}, [cb, delay]);

	const clear = () => {
		if (isNumber(timerRef.current)) {
			clearTimeout(timerRef.current);
		}
	};

	return clear;
}
