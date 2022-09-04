import { useCallback, useReducer } from "react";

interface DashboardState {
	feed: string | null;
	entry: string | null;
}

const dashboardReducer = (
	state: DashboardState,
	action:
		| {
				type: "SELECT_FEED";
				feedId: string | null;
		  }
		| { type: "SELECT_ENTRY"; entryId: string | null }
): DashboardState => {
	switch (action.type) {
		case "SELECT_ENTRY":
			return { ...state, entry: action.entryId };
		case "SELECT_FEED":
			return { feed: action.feedId, entry: null };
	}
};

export const useDashboard = () => {
	const [state, dispatch] = useReducer(dashboardReducer, { feed: null, entry: null });

	const selectEntry = useCallback(
		(id: string) => {
			dispatch({ type: "SELECT_ENTRY", entryId: id });
		},
		[dispatch]
	);

	const selectFeed = useCallback(
		(id: string) => {
			dispatch({ type: "SELECT_FEED", feedId: id });
		},
		[dispatch]
	);

	return [state, { selectEntry, selectFeed }] as const;
};
