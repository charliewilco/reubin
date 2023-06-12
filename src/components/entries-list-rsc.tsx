import { Controllers } from "$/lib/controllers";
import type { EntryFilter } from "$/lib/filters";
import Link from "next/link";
import type { Entry } from "@prisma/client";
import { classNames } from "./ui/class-names";

interface EntriesListProps {
	feedId: string;
	filter: EntryFilter;
}

function sortByNearest({ pubDate: a }: Entry, { pubDate: b }: Entry) {
	const now = Date.now();
	return (
		Math.abs(Date.parse(a.toDateString()) - now) - Math.abs(Date.parse(b.toDateString()) - now)
	);
}

export async function EntriesList(props: EntriesListProps) {
	// let authRequest = Auth.handleRequest({ cookies: cookies });
	// const { user } = await authRequest.validateUser();

	let entries = await Controllers.entry.getByFeed(props.feedId, props.filter);

	return (
		<div className="absolute left-0 top-0 w-full">
			<ul className="divide-y">
				{entries.sort(sortByNearest).map((entry) => {
					let isSelected = false;
					return (
						<li
							key={entry.id}
							className={classNames(
								"cursor-pointer border-b border-zinc-200 dark:border-zinc-700",
								!entry.unread && "opacity-50",
								isSelected && "bg-sky-500/50 text-white opacity-100"
							)}>
							<Link
								href={`/${props.filter}/${props.feedId}/${entry.id}/`}
								className="block p-4">
								<h3 className="mb-2 text-base">{entry.title}</h3>
								<p className="text-xs uppercase tracking-wide">
									{entry.pubDate.toDateString()}
								</p>
							</Link>
						</li>
					);
				})}
			</ul>
		</div>
	);
}
