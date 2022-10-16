import { createContext, createElement, useCallback, useContext, useReducer } from "react";

interface DashboardState {
  feed: string | null;
  entry: string | null;
}

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

  const selectEntry = useCallback(
    (id: string) => {
      dispatch({ type: "SELECT_ENTRY", entryId: id });
    },
    [dispatch]
  );

  const selectFeed = useCallback(
    (id: string) => {
      dispatch({ type: "SELECT_FEED", feed: id });
    },
    [dispatch]
  );

  const unselectFeed = useCallback(() => {
    dispatch({ type: "SELECT_FEED", feed: null });
  }, [dispatch]);

  return [state, { selectEntry, selectFeed, unselectFeed }] as const;
};

const DashContext = createContext<ReturnType<typeof useDashboard>>([
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

export const DashboardProvider = ({ children }: { children?: React.ReactNode }) => {
  const value = useDashboard();
  return createElement(DashContext.Provider, { value }, children);
};

export const useDashboardContext = () => {
  return useContext(DashContext);
};
