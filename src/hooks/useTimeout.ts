import { useEffect, useRef } from "react";

export function useTimeout(cb: () => void, delay: number = 1000) {
	const timerRef = useRef<NodeJS.Timer | null>(null);

	useEffect(() => {
		timerRef.current = setTimeout(() => {
			cb();
		}, delay);

		return () => {
			if (timerRef.current) {
				clearTimeout(timerRef.current);
			}
		};
	}, [cb, delay]);

	const clear = () => {
		if (timerRef.current) {
			clearTimeout(timerRef.current);
		}
	};

	return clear;
}
