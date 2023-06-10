import { useMemo, useRef } from "react";
import { useIsomorphicLayoutEffect } from "./useIsomorphicEffect";

type Fn<ARGS extends any[], R> = (...args: ARGS) => R;

export const useEventCallback = <A extends any[], R>(fn: Fn<A, R>): Fn<A, R> => {
	let ref = useRef<Fn<A, R>>(fn);
	useIsomorphicLayoutEffect(() => {
		ref.current = fn;
	});
	return useMemo(
		() =>
			(...args: A): R => {
				const { current } = ref;
				return current(...args);
			},
		[]
	);
};
