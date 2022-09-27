import Head from "next/head";
import isEqual from "react-fast-compare";
import { memo } from "react";
import { EntryList } from "../../components/entries-list";
import { AddFeed } from "../../components/add-feed";
import { FeedList } from "../../components/feed-list";
import { SideNavigation } from "../../components/side-navigation";
import { AppHeader } from "../../components/app-header";
import { EntryFull } from "../../components/entry-full";
import { DashboardProvider, useDashboardContext } from "../../hooks/useDashboard";
import { EntryFilter } from "../../lib/__generated__";

function UnreadEntries() {
  const [{ feed, entry }, { selectEntry }] = useDashboardContext();

  return (
    <div className="h-screen">
      <Head>
        <title>Unread | Reubin</title>
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
      <div className="flex h-screen flex-col">
        <AppHeader title="Unread Entries">
          <div className="flex justify-end gap-4">
            <AddFeed />

            <div>
              <object className="mx-auto block h-8 w-8 rounded-full bg-gradient-to-r from-sky-500 to-blue-500" />
              <div className="sr-only">
                <p>Some Name</p>
                <p>Account settings</p>
              </div>
            </div>
          </div>
        </AppHeader>
        <div className="flex flex-1">
          <div className="relative flex h-full flex-col justify-between border-r border-zinc-200 dark:border-zinc-700">
            <SideNavigation />
          </div>
          <main className="grid flex-1 grid-cols-12">
            <aside className="col-span-2 overflow-y-scroll border-r border-zinc-200 dark:border-zinc-700">
              <div className="relative h-full dark:bg-zinc-900">
                <FeedList />
              </div>
            </aside>
            <aside className="col-span-3 overflow-y-scroll border-r border-zinc-200 dark:border-zinc-700">
              <div className="relative dark:bg-zinc-900">
                {feed !== null && (
                  <EntryList
                    {...feed}
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
          </main>
        </div>
      </div>
    </div>
  );
}

const MemoUnread = memo(UnreadEntries, isEqual);

export default function DashboardPage() {
  return (
    <DashboardProvider>
      <MemoUnread />
    </DashboardProvider>
  );
}
