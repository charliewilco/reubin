import { useRef } from "react";
import { proxy, useSnapshot } from "valtio";

interface DashboardState {
  feed: string | null;
  entry: string | null;
}

class DashboardUI {
  state = proxy<DashboardState>({
    feed: null,
    entry: null,
  });

  selectFeed = (id: string) => {
    this.state.feed = id;
  };
  selectEntry = (id: string) => {
    this.state.entry = id;
  };

  clearFeed = () => {
    this.state.feed = null;
  };
  clearEntry = () => {
    this.state.entry = null;
  };
}

export const dashboardState = proxy<DashboardState>({
  feed: null,
  entry: null,
});

export const useDashboard = () => {
  const ref = useRef(new DashboardUI()).current;
  const state = useSnapshot(ref.state);

  return [state, { selectFeed: ref.selectFeed, selectEntry: ref.selectEntry }] as const;
};
