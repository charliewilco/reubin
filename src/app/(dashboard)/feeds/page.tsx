import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { DashboardProvider } from "$/components/dashboard-wrapper";
import { ConnectedEntryList } from "$/components/entries-list";
import { ConnectedEntryFull } from "$/components/entry-full";
import { FeedList } from "$/components/feed-list";
import { Auth } from "$/lib/auth";
import { Controllers } from "$/lib/controllers";

export const metadata: Metadata = {
	title: "Feeds",
};

export default async function DashboardPage() {
	const authRequest = Auth.handleRequest({ cookies });
	const { user } = await authRequest.validateUser();
	if (!user) redirect("/login");

	let feeds = await Controllers.feed.getAll(user.userId);

	return (
		<DashboardProvider>
			<div className="grid h-full w-full flex-1 grid-cols-12">
				<aside className="col-span-2 overflow-y-scroll border-r border-zinc-200 dark:border-zinc-700">
					<div className="relative h-full dark:bg-zinc-900">
						<FeedList initialData={feeds} />
					</div>
				</aside>
				<aside className="col-span-3 overflow-y-scroll border-r border-zinc-200 dark:border-zinc-700">
					<div className="relative dark:bg-zinc-900">
						<ConnectedEntryList />
					</div>
				</aside>
				<section
					aria-labelledby="primary-heading"
					className="col-span-7 h-full overflow-y-scroll dark:bg-zinc-800">
					<div className="relative">
						<h1 id="primary-heading" className="sr-only">
							Entry
						</h1>
						<ConnectedEntryFull />
					</div>
				</section>
			</div>
		</DashboardProvider>
	);
}
