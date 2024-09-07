import Utils from "@r/utils";
import { useEffect, useRef } from "react";

export function useTimeout(cb: () => void, delay = 1000) {
	const timerRef = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		timerRef.current = setTimeout(() => {
			cb();
		}, delay);

		return () => {
			if (Utils.Number.isNumber(timerRef.current)) {
				clearTimeout(timerRef.current);
			}
		};
	}, [cb, delay]);

	const clear = () => {
		if (Utils.Number.isNumber(timerRef.current)) {
			clearTimeout(timerRef.current);
		}
	};

	return clear;
}
