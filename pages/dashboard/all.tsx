import Head from "next/head";
import { AddFeed } from "../../components/add-feed";
import { AppHeader } from "../../components/app-header";
import { EntryList } from "../../components/entries-list";
import { EntryFull } from "../../components/entry-full";
import { FeedList } from "../../components/feed-list";
import { SideNavigation } from "../../components/side-navigation";
import { DashboardProvider, useDashboardContext } from "../../hooks/useDashboard";

function AllEntries() {
	const [{ feed, entry }, { selectEntry }] = useDashboardContext();

	return (
		<div>
			<Head>
				<title>Inbox | Reubin</title>
				<link rel="icon" type="image/png" href="/favicon.png" />
			</Head>
			<div className="flex h-screen flex-col">
				<AppHeader title="All Entries">
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
					<div className="flex h-full flex-col justify-between border-r border-zinc-700">
						<div>
							<SideNavigation />
						</div>
					</div>
					<main className="grid flex-1 grid-cols-12">
						<aside className="col-span-2 overflow-y-scroll border-r border-zinc-200 dark:border-zinc-700">
							<div className="relative h-full bg-zinc-900">
								<FeedList />
							</div>
						</aside>
						<aside className="col-span-3 overflow-y-scroll border-r border-zinc-200 dark:border-zinc-700">
							<div className="relative bg-zinc-900">
								{feed !== null && (
									<EntryList {...feed} selectedEntry={entry} onSelect={selectEntry} />
								)}
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

export default function DashboardAllPage() {
	return (
		<DashboardProvider>
			<AllEntries />
		</DashboardProvider>
	);
}
