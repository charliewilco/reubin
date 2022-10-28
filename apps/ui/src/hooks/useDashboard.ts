"use client";

import { createContext, useContext, useReducer } from "react";
import { proxy } from "valtio";
import { useEventCallback } from "./useEventCallback";

interface DashboardState {
  feed: string | null;
  entry: string | null;
}

export const dashAtom = proxy<DashboardState>({
  feed: null,
  entry: null,
});

type DashboardAction =
  | {
      type: "SELECT_FEED";
      feed: null | string;
    }
  | { type: "SELECT_ENTRY"; entryId: string | null };

export const useDashboard = () => {
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
};

export const DashContext = createContext<ReturnType<typeof useDashboard>>([
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

export const useDashboardContext = () => {
  return useContext(DashContext);
};
