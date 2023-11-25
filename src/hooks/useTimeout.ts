import { isNumber } from "$/utils/number";
import { useEffect, useRef } from "react";

export function useTimeout(cb: () => void, delay: number = 1000) {
	const timerRef = useRef<NodeJS.Timer | number | null>(null);

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
