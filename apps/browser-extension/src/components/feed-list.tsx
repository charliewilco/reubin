interface FeedListProps {
	links: RSSLink[];
}

function FeedListItem({ title, href, type }: RSSLink) {
	return (
		<li className="cursor-pointer" key={href}>
			<div className="block px-2 py-4 hover:bg-zinc-200 dark:hover:bg-zinc-500">
				<div className="flex items-center gap-2">
					<div className="flex flex-shrink-0 items-center">
						<svg
							stroke="currentColor"
							fill="currentColor"
							strokeWidth="0"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6 text-sky-500 dark:text-sky-600"
							aria-hidden="true">
							<use href="#icon-feed"></use>
						</svg>
					</div>
					<div className="flex-1">
						<div className="truncate">
							<div>
								<p className="truncate text-base font-bold text-sky-500 dark:text-sky-600">
									{title}
								</p>
								<p className="font-mono text-xs opacity-50">{href}</p>
							</div>
							<div className="mt-2 flex"></div>
						</div>
					</div>
					<div className="flex-shrink-0">
						<svg
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="h-5 w-5 text-zinc-400"
							aria-hidden="true">
							<use href="#icon-chevron-right"></use>
						</svg>
					</div>
				</div>
			</div>
		</li>
	);
}

function renderListItem(item: RSSLink) {
	return <FeedListItem {...item} key={item.href} />;
}

export function FeedList({ links }: FeedListProps) {
	return (
		<div className="overflow-hidden rounded-md bg-white shadow dark:bg-zinc-800">
			<ul role="list" className="divide-y dark:divide-zinc-600">
				{links.map(renderListItem)}
			</ul>
		</div>
	);
}
