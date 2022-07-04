import Head from "next/head";
import { EntryList } from "../../components/entries-list";
import { AddFeed } from "../../components/add-feed";
import { FeedList } from "../../components/feed-list";
import { SideNavigation } from "../../components/side-navigation";
import { AppHeader } from "../../components/app-header";
import { EntryFull } from "../../components/entry-full";
import { useDashboard } from "../../hooks/useDashboard";

export default function UnreadEntries() {
  const [{ feed, entry }, { selectEntry, selectFeed }] = useDashboard();

  return (
    <div className="h-screen">
      <Head>
        <title>Unread | Reubin</title>
      </Head>
      <div className="flex h-screen flex-col">
        <AppHeader title="All Entries" />
        <div className="flex flex-1">
          <div className="flex h-full flex-col justify-between border-r border-zinc-700">
            <div>
              <SideNavigation />
            </div>

            <div className="pb-4">
              <object className="mx-auto block h-8 w-8 rounded-full bg-gradient-to-r from-sky-500 to-blue-500" />
              <div className="sr-only">
                <p>Some Name</p>
                <p>Account settings</p>
              </div>
            </div>
          </div>
          <main className="grid flex-1 grid-cols-12">
            <aside className="col-span-2 overflow-y-scroll border-r border-zinc-700">
              <div className="relative h-full  bg-zinc-900">
                <FeedList onSelect={selectFeed} />
                <div className="absolute bottom-0 left-0 right-0 flex w-full justify-center bg-red-500/50 p-2">
                  <AddFeed />
                </div>
              </div>
            </aside>
            <aside className="col-span-3 overflow-y-scroll border-r border-zinc-700">
              <div className="relative bg-zinc-900">
                {feed !== null && <EntryList feedID={feed} onSelect={selectEntry} />}
              </div>
            </aside>
            <section
              aria-labelledby="primary-heading"
              className="col-span-7 h-full overflow-y-scroll bg-zinc-800">
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
