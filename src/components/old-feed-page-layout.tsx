export function DashboardPage() {
	return (
		<div className="grid h-full w-full flex-1 grid-cols-12">
			<aside className="col-span-2 overflow-y-scroll border-r border-zinc-200 dark:border-zinc-700">
				<div className="relative h-full dark:bg-zinc-900">
					<h1>Feeds</h1>
				</div>
			</aside>
			<aside className="col-span-3 overflow-y-scroll border-r border-zinc-200 dark:border-zinc-700">
				<div className="relative dark:bg-zinc-900">
					<h1>Entries</h1>
				</div>
			</aside>
			<section
				aria-labelledby="primary-heading"
				className="col-span-7 h-full overflow-y-scroll dark:bg-zinc-800">
				<div className="relative">
					<h1 id="primary-heading" className="sr-only">
						Entry
					</h1>
				</div>
			</section>
		</div>
	);
}
