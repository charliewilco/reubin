import Head from "next/head";
import { useState } from "react";
import { EntryList } from "../../components/entries-list";
import { AddFeedTrigger } from "../../components/add-feed";
import { FeedList } from "../../components/feed-list";
import { SideNavigation } from "../../components/side-navigation";
import { AppHeader } from "../../components/app-header";

export default function UnreadEntries() {
  const [selectedFeed, setSelectedFeed] = useState<string | null>(null);
  return (
    <div className="h-screen">
      <Head>
        <title>Unread | Reubin</title>
      </Head>
      <div className="flex h-full flex-col">
        <AppHeader title="Unread" />
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
            <aside className="col-span-2 border-r border-zinc-700">
              <div className="relative h-full overflow-y-auto bg-zinc-900">
                <FeedList onSelect={setSelectedFeed} />
                <div className="absolute bottom-0 left-0 right-0 w-full bg-red-500 p-2">
                  <AddFeedTrigger />
                </div>
              </div>
            </aside>
            <aside className="col-span-3 border-r border-zinc-700">
              <div className="relative h-full overflow-y-auto bg-zinc-900">
                {selectedFeed !== null && <EntryList feedID={selectedFeed} />}
              </div>
            </aside>
            <section
              aria-labelledby="primary-heading"
              className="col-span-7 h-full overflow-y-auto bg-zinc-800">
              <h1 id="primary-heading" className="sr-only">
                Entry
              </h1>
              <p>Hello</p>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
