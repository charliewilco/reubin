"use client";

import { useReducer } from "react";
import { DashContext, dashboardReducer } from "../hooks/useDashboard";
import { useEventCallback } from "../hooks/useEventCallback";

export function DashboardProvider({ children }: { children?: React.ReactNode }) {
	const [state, dispatch] = useReducer(dashboardReducer, { feed: null, entry: null });

	const selectEntry = useEventCallback((id: string) => {
		dispatch({ type: "SELECT_ENTRY", entryId: id });
	});

	const selectFeed = useEventCallback((id: string) => {
		dispatch({ type: "SELECT_FEED", feed: id });
	});

	const unselectFeed = useEventCallback(() => {
		dispatch({ type: "SELECT_FEED", feed: null });
	});

	return (
		<DashContext.Provider value={[state, { selectEntry, selectFeed, unselectFeed }]}>
			{children}
		</DashContext.Provider>
	);
}
