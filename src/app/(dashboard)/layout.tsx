import { cookies } from 'next/headers'
import { addFeed } from '$/actions'
import { AddFeed } from '$/components/add-feed/create'
import { AppHeader } from '$/components/app-header'
import { DashboardNavigationRail } from '$/components/dashboard-navigation'
import { Controllers } from '$/lib/controllers'

interface LayoutProps {
	children: React.ReactNode
	header: React.ReactNode
}

export default async function Layout({ children }: LayoutProps) {
	const { user } = await Controllers.session.getUserSession(cookies)
	return (
		<div className="h-screen">
			<div className="flex h-screen flex-col">
				<AppHeader username={user?.username}>
					<div className="flex justify-end gap-4">
						<AddFeed onAdd={addFeed} />
					</div>
				</AppHeader>
				<div className="relative flex flex-1">
					<div className="fixed bottom-0 left-0 right-0 z-10 flex w-full justify-between border-r border-zinc-200 md:relative md:h-full md:w-auto md:flex-col dark:border-zinc-700">
						<DashboardNavigationRail />
					</div>
					<main className="flex-1" id="feed-container">
						{children}
					</main>
				</div>
			</div>
		</div>
	)
}
