import { createContext, useContext, useReducer } from "react";
import { proxy } from "valtio";
import { useEventCallback } from "./useEventCallback";

export interface DashboardState {
	feed: string | null;
	entry: string | null;
}

export const dashAtom = proxy<DashboardState>({
	feed: null,
	entry: null,
});

export type DashboardAction =
	| {
			type: "SELECT_FEED";
			feed: null | string;
	  }
	| { type: "SELECT_ENTRY"; entryId: string | null };

export function useDashboard() {
	const [state, dispatch] = useReducer(
		(state: DashboardState, action: DashboardAction): DashboardState => {
			switch (action.type) {
				case "SELECT_ENTRY":
					return { ...state, entry: action.entryId };
				case "SELECT_FEED":
					return { feed: action.feed, entry: null };
			}
		},
		{ feed: null, entry: null }
	);

	const selectEntry = useEventCallback((id: string) => {
		dispatch({ type: "SELECT_ENTRY", entryId: id });
	});

	const selectFeed = useEventCallback((id: string) => {
		dispatch({ type: "SELECT_FEED", feed: id });
	});

	const unselectFeed = useEventCallback(() => {
		dispatch({ type: "SELECT_FEED", feed: null });
	});

	return [state, { selectEntry, selectFeed, unselectFeed }] as const;
}

type DashContextType = [
	{
		feed: string | null;
		entry: string | null;
	},
	{
		selectEntry(id: string): void;
		selectFeed(id: string): void;
		unselectFeed(): void;
	}
];

export const DashContext = createContext<DashContextType>([
	{
		feed: null,
		entry: null,
	},
	{
		selectEntry() {},
		selectFeed() {},
		unselectFeed() {},
	},
]);

export function dashboardReducer(state: DashboardState, action: DashboardAction) {
	switch (action.type) {
		case "SELECT_ENTRY":
			return { ...state, entry: action.entryId };
		case "SELECT_FEED":
			return { feed: action.feed, entry: null };
	}
}

export function useDashboardContext() {
	return useContext(DashContext);
}
