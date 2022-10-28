import { DashboardProvider } from "../../../hooks/useDashboard";
import { ConnectedEntryList } from "../../../components/entries-list";
import { FeedList } from "../../../components/feed-list";
import { EntryFilter } from "../../../lib/__generated__";

export default function DashboardPage() {
  return (
    <DashboardProvider>
      <div className="grid flex-1 grid-cols-12">
        <aside className="col-span-2 overflow-y-scroll border-r border-zinc-200 dark:border-zinc-700">
          <div className="relative h-full dark:bg-zinc-900">
            <FeedList />
          </div>
        </aside>
        <aside className="col-span-3 overflow-y-scroll border-r border-zinc-200 dark:border-zinc-700">
          <div className="relative dark:bg-zinc-900">
            <ConnectedEntryList filter={EntryFilter.Unread} />
          </div>
        </aside>
        <section
          aria-labelledby="primary-heading"
          className="col-span-7 h-full overflow-y-scroll dark:bg-zinc-800">
          <div className="relative">
            <h1 id="primary-heading" className="sr-only">
              Entry
            </h1>
            <ConnectedEntryList />
          </div>
        </section>
      </div>
    </DashboardProvider>
  );
}
