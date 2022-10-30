import { createContext, createElement, useContext, useRef, useSyncExternalStore } from "react";
import { useEventCallback } from "./useEventCallback";

interface FastStoreContext<TStore> {
	get: () => TStore;
	set: (value: Partial<TStore>) => void;
	subscribe: (callback: () => void) => () => boolean;
}

export function createFastStore<TStore>(initialState: TStore) {
	function useFastStoreData() {
		const storeRef = useRef(initialState);

		const listenersRef = useRef(new Set<() => void>());

		const get = useEventCallback(() => storeRef.current);

		const set = useEventCallback((value: Partial<TStore>) => {
			storeRef.current = { ...storeRef.current, ...value };
			listenersRef.current.forEach((callback) => callback());
		});

		const subscribe = useEventCallback((callback: () => void) => {
			listenersRef.current.add(callback);
			return () => listenersRef.current.delete(callback);
		});

		return {
			get,
			set,
			subscribe,
		};
	}

	const StoreContext = createContext<FastStoreContext<TStore>>({
		get: () => initialState,
		set: () => {},
		subscribe: () => () => false,
	});

	function FastProvider({ children }: { children: React.ReactNode }) {
		const storeData = useFastStoreData();

		return createElement(StoreContext.Provider, { value: storeData }, children);
	}

	function useFastStore<SelectorOutput>(
		selector: (store: TStore) => SelectorOutput = (store) => store as any
	): [SelectorOutput, (value: Partial<TStore>) => void] {
		const store = useContext(StoreContext);
		if (!store) {
			throw new Error("Store not found");
		}

		const state = useSyncExternalStore(
			store.subscribe,
			() => selector(store.get()),
			() => selector(initialState)
		);

		return [state, store.set];
	}

	return {
		FastProvider,
		useFastStore,
		useFastStoreData,
	};
}
