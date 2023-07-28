import { AddFeed } from "$/components/feed-create";
import { AppHeader } from "$/components/app-header";
import { DashboardNavigationRail } from "$/components/dashboard-navigation";
import { addFeed } from "$/actions";
import { Services } from "$/lib/services";

export default async function Layout({ children }: React.PropsWithChildren<{}>) {
	const { user } = await Services.getUserSession();

	return (
		<div className="h-screen">
			<div className="flex h-screen flex-col">
				<AppHeader username={user?.username}>
					<div className="flex justify-end gap-4">
						<AddFeed onAdd={addFeed} />
					</div>
				</AppHeader>
				<div className="relative flex flex-1">
					<div className="fixed bottom-0 left-0 right-0 z-10 flex w-full justify-between border-r border-zinc-200 dark:border-zinc-700 md:relative md:h-full md:w-auto md:flex-col">
						<DashboardNavigationRail />
					</div>
					<main className="flex-1" id="feed-container">
						{children}
					</main>
				</div>
			</div>
		</div>
	);
}
