import { AddFeed } from "../../components/add-feed";
import { AppHeader } from "../../components/app-header";
import { SideNavigation } from "../../components/side-navigation";

export default function Layout({ children }: React.PropsWithChildren<{}>) {
	return (
		<div className="h-screen">
			<div className="flex h-screen flex-col">
				<AppHeader>
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
					<main className="flex-1" id="feed-container">
						{children}
					</main>
				</div>
			</div>
		</div>
	);
}
