import { DashContext, useDashboard } from "../hooks/useDashboard";

export function DashboardProvider({ children }: { children?: React.ReactNode }) {
  const value = useDashboard();
  return <DashContext.Provider value={value}>{children}</DashContext.Provider>;
}
