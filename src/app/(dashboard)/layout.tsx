import { AddFeed } from "$/components/feed-create";
import { AppHeader } from "$/components/app-header";
import { DashboardNavigationRail } from "$/components/dashboard-navigation";
import { addFeed } from "$/actions";

export default function Layout({ children }: React.PropsWithChildren<{}>) {
	return (
		<div className="h-screen">
			<div className="flex h-screen flex-col">
				<AppHeader>
					<div className="flex justify-end gap-4">
						<AddFeed onAdd={addFeed} />
					</div>
				</AppHeader>
				<div className="flex flex-1">
					<div className="relative flex h-full flex-col justify-between border-r border-zinc-200 dark:border-zinc-700">
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
