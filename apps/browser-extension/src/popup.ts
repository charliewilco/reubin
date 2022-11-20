import { html, render } from "htm/preact";
import { useCallback, useEffect, useState } from "preact/hooks";
import { parseDocumentLinks } from "./parse-document";

function FeedList(props: { links: RSSLink[] }) {
	return html`
		<div class="overflow-hidden rounded-md bg-white shadow dark:bg-zinc-800">
			<ul role="list" class="divide-y dark:divide-zinc-600">
				${props.links.map(
					({ title, href, type }) => html`
						<li class="cursor-pointer" key=${href}>
							<div class="block px-2 py-4 hover:bg-zinc-200 dark:hover:bg-zinc-500">
								<div class="flex items-center gap-2">
									<div class="flex flex-shrink-0 items-center">
										<svg
											stroke="currentColor"
											fill="currentColor"
											strokeWidth="0"
											viewBox="0 0 24 24"
											xmlns="http://www.w3.org/2000/svg"
											class="h-6 w-6 text-sky-500 dark:text-sky-600"
											aria-hidden="true">
											<use href="#icon-feed"></use>
										</svg>
									</div>
									<div class="flex-1">
										<div class="truncate">
											<div>
												<p class="truncate text-base font-bold text-sky-500 dark:text-sky-600">
													${title}
												</p>
												<p class="font-mono text-xs opacity-50">${href}</p>
											</div>
											<div class="mt-2 flex"></div>
										</div>
									</div>
									<div class="flex-shrink-0">
										<svg
											width="24"
											height="24"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
											class="h-5 w-5 text-zinc-400"
											aria-hidden="true">
											<use href="#icon-chevron-right"></use>
										</svg>
									</div>
								</div>
							</div>
						</li>
					`
				)}
			</ul>
		</div>
	`;
}

interface AppWrapperProps {
	children?: any;
	onRetry(): void;
}

function AppWrapper({ children, onRetry }: AppWrapperProps) {
	return html`
		<div>
			<header class="mb-4 flex items-center justify-between ">
				<h2 class="flex-1 text-xl font-semibold">Available Feeds</h2>
				<button aria-label="Refresh" onClick=${onRetry}>
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						class="h-5 w-5 text-zinc-400"
						aria-hidden="true">
						<use href="#icon-refresh"></use>
					</svg>
				</button>
			</header>

			${children}
		</div>
	`;
}

function LoadingState() {
	return html`
		<div class="flex justify-center">
			<div class="h-8 w-8 text-sky-500" role="alert" aria-busy="true">
				<svg height="100%" viewBox="0 0 32 32" width="100%" class="animate-spin">
					<circle
						cx="16"
						cy="16"
						fill="none"
						r="14"
						stroke-width="4"
						stroke="currentColor"
						opacity="0.2"></circle>
					<circle
						cx="16"
						cy="16"
						fill="none"
						r="14"
						stroke-width="4"
						stroke="currentColor"
						stroke-dashoffset="60"
						stroke-dasharray="80"></circle>
				</svg>
			</div>
		</div>
	`;
}

function Empty() {
	return html`
		<div class="py-4 text-center">
			<p class="text-lg opacity-50">No feeds found.</p>
			<p>
				<a class="text-sky-500 dark:text-sky-600" href="https://reubin.app">
					Learn more here.
				</a>
			</p>
		</div>
	`;
}
function AvailableFeedList() {
	const [state, setState] = useState<{
		hasChecked: boolean;
		availableFeeds: RSSLink[];
	}>({ hasChecked: false, availableFeeds: [] });

	useEffect(() => {
		if (!state.hasChecked) {
			parseDocumentLinks().then((links) => {
				setState({
					hasChecked: true,
					availableFeeds: links ?? [],
				});
			});
		}
	}, [state]);

	const handleRetry = useCallback(() => {
		setState({
			hasChecked: false,
			availableFeeds: [],
		});
	}, []);

	let content = null;

	if (!state.hasChecked) {
		content = LoadingState();
	} else if (state.availableFeeds.length === 0) {
		content = Empty();
	} else {
		content = FeedList({ links: state.availableFeeds });
	}

	return AppWrapper({ children: content, onRetry: handleRetry });
}

const root = document.getElementById("app");

if (root !== null) {
	render(
		html`
			<${AvailableFeedList} />
		`,
		root
	);
}
