import { DashboardProvider } from "../../../components/dashboard-wrapper";
import { EntryList } from "../../../components/entries-list";
import { EntryFull } from "../../../components/entry-full";
import { FeedList } from "../../../components/feed-list";
import { useDashboardContext } from "../../../hooks/useDashboard";
import { EntryFilter } from "../../../lib/__generated__";

function DashboardPage() {
  const [{ feed, entry }, { selectEntry }] = useDashboardContext();
  return (
    <>
      <aside className="col-span-2 overflow-y-scroll border-r border-zinc-200 dark:border-zinc-700">
        <div className="relative h-full dark:bg-zinc-900">
          <FeedList />
        </div>
      </aside>
      <aside className="col-span-3 overflow-y-scroll border-r border-zinc-200 dark:border-zinc-700">
        <div className="relative dark:bg-zinc-900">
          {feed !== null && (
            <EntryList
              id={feed}
              filter={EntryFilter.Unread}
              selectedEntry={entry}
              onSelect={selectEntry}
            />
          )}
        </div>
      </aside>
      <section
        aria-labelledby="primary-heading"
        className="col-span-7 h-full overflow-y-scroll dark:bg-zinc-800">
        <div className="relative">
          <h1 id="primary-heading" className="sr-only">
            Entry
          </h1>

          {entry && <EntryFull id={entry} />}
        </div>
      </section>
    </>
  );
}

export default function WrappedDashboard() {
  return (
    <DashboardProvider>
      <DashboardPage />
    </DashboardProvider>
  );
}
