import { Controllers } from "$/lib/controllers";
import { Auth } from "$/lib/auth";
import type { Feed } from "@prisma/client";
import { cookies } from "next/headers";
import { Rss, CheckCircle } from "lucide-react";
import { revalidatePath } from "next/cache";

interface RecommendationCardProps {
	displayName: string;
	link: string;
	type?: "feed" | "twitter";
	feeds?: Feed[];
}

export function RecommendationCard(props: RecommendationCardProps) {
	let feeds = props.feeds ?? [];

	const hasFeed = feeds.findIndex((f) => f?.feedURL === props.link) > -1;

	async function _addFeed() {
		"use server";

		const authRequest = Auth.handleRequest({ cookies });
		const { user } = await authRequest.validateUser();
		await Controllers.feed.add(props.link, user.userId);
		revalidatePath("/recommendations");
	}

	let content = (
		<form action={_addFeed} className="block w-full text-center">
			<button
				type="submit"
				className="flex w-full items-center justify-center rounded-bl-lg border border-transparent  py-4 text-sm font-medium hover:text-gray-500">
				<Rss className="h-5 w-5 text-zinc-400" aria-hidden="true" />
				<span className="ml-3">Subscribe</span>
			</button>
		</form>
	);

	if (hasFeed) {
		content = (
			<div className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center rounded-bl-lg border border-transparent py-4 text-sm font-medium opacity-50 hover:text-gray-500">
				<CheckCircle className="h-5 w-5 text-zinc-400" aria-hidden="true" />
				<span className="ml-3">Subscribed</span>
			</div>
		);
	}

	return (
		<div className="divide-y divide-zinc-500 rounded-lg bg-zinc-100 shadow dark:bg-zinc-800 dark:shadow-zinc-500/50">
			<div className="flex w-full items-center justify-between space-x-6 p-6">
				<div className="flex-1 truncate">
					<div className="flex items-center space-x-3">
						<h3 className="truncate text-sm font-medium">{props.displayName}</h3>
					</div>
					<p className="mt-1 truncate text-sm text-zinc-500">{props.link}</p>
				</div>
			</div>
			<div>
				<div className="-mt-px flex divide-x divide-zinc-500">
					<div className="flex w-0 flex-1">{content}</div>
				</div>
			</div>
		</div>
	);
}
