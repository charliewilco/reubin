import { cookies } from "next/headers";

import { DashboardProvider } from "../../../hooks/useDashboard";
import { ConnectedEntryList } from "../../../components/entries-list";
import { ConnectedEntryFull } from "../../../components/entry-full";
import { FeedList } from "../../../components/feed-list";
import { getFeeds } from "../../../lib/graphql";
import { TOKEN_NAME } from "../../../lib/auth-token";

export default async function DashboardPage() {
	const nextCookies = cookies();

	const _ = await getFeeds(nextCookies.get(TOKEN_NAME));

	return (
		<DashboardProvider>
			<div className="grid w-full flex-1 grid-cols-12">
				<aside className="col-span-2 overflow-y-scroll border-r border-zinc-200 dark:border-zinc-700">
					<div className="relative h-full dark:bg-zinc-900">
						<FeedList initialData={_} />
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
