import React, {
  createContext,
  createElement,
  useCallback,
  useContext,
  useReducer,
} from "react";

interface DashboardState {
  feed: { id: string; title: string } | null;
  entry: string | null;
}

const dashboardReducer = (
  state: DashboardState,
  action:
    | {
        type: "SELECT_FEED";
        feed: null | { id: string; title: string };
      }
    | { type: "SELECT_ENTRY"; entryId: string | null }
): DashboardState => {
  switch (action.type) {
    case "SELECT_ENTRY":
      return { ...state, entry: action.entryId };
    case "SELECT_FEED":
      return { feed: action.feed, entry: null };
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
    (id: string, title: string) => {
      dispatch({ type: "SELECT_FEED", feed: { id, title } });
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
