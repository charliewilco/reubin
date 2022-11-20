import {
	elementScroll,
	observeElementOffset,
	observeElementRect,
	observeWindowOffset,
	observeWindowRect,
	Virtualizer,
	windowScroll,
	type VirtualizerOptions,
} from "./core";
import type { PartialKeys } from "./utils";

import { useEffect, useReducer, useState } from "react";
import { useIsomorphicLayoutEffect } from "../../../hooks/useIsomorphicEffect";

function useVirtualizerBase<TScrollElement, TItemElement = unknown>(
	options: VirtualizerOptions<TScrollElement, TItemElement>
): Virtualizer<TScrollElement, TItemElement> {
	const rerender = useReducer(() => ({}), {})[1];

	const resolvedOptions: VirtualizerOptions<TScrollElement, TItemElement> = {
		...options,
		onChange: (instance) => {
			rerender();
			options.onChange?.(instance);
		},
	};

	const [instance] = useState(
		() => new Virtualizer<TScrollElement, TItemElement>(resolvedOptions)
	);

	instance.setOptions(resolvedOptions);

	useEffect(() => {
		return instance._didMount();
	}, [instance]);

	useIsomorphicLayoutEffect(() => {
		return instance._willUpdate();
	});

	return instance;
}

export function useVirtualizer<TScrollElement, TItemElement = unknown>(
	options: PartialKeys<
		VirtualizerOptions<TScrollElement, TItemElement>,
		"observeElementRect" | "observeElementOffset" | "scrollToFn"
	>
): Virtualizer<TScrollElement, TItemElement> {
	return useVirtualizerBase<TScrollElement, TItemElement>({
		observeElementRect: observeElementRect,
		observeElementOffset: observeElementOffset,
		scrollToFn: elementScroll,
		...options,
	});
}

export function useWindowVirtualizer<TItemElement = unknown>(
	options: PartialKeys<
		VirtualizerOptions<Window, TItemElement>,
		"getScrollElement" | "observeElementRect" | "observeElementOffset" | "scrollToFn"
	>
): Virtualizer<Window, TItemElement> {
	return useVirtualizerBase<Window, TItemElement>({
		getScrollElement: () => (typeof window !== "undefined" ? window : null!),
		observeElementRect: observeWindowRect,
		observeElementOffset: observeWindowOffset,
		scrollToFn: windowScroll,
		...options,
	});
}
