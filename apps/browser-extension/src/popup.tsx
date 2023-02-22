import useSWR, { SWRConfig } from "swr";
import { createRoot } from "react-dom/client";
import { parseDocumentLinks } from "./parse-document";
import { getTabURL } from "./get-tab-url";

function Empty() {
	return (
		<div className="py-4 text-center">
			<p className="text-lg opacity-50">No feeds found.</p>
			<p>
				<a className="text-sky-500 dark:text-sky-600" href="https://reubin.app">
					Learn more here.
				</a>
			</p>
		</div>
	);
}

interface ErrorMessageProps {
	message: string;
}

function ErrorMessage(props: ErrorMessageProps) {
	return (
		<div>
			<p className="text-sm font-semibold text-red-500">
				Something winged it's way into the feed.
			</p>
			<code className="font-mono">{props.message}</code>
		</div>
	);
}

interface WrapperProps {
	children?: React.ReactNode;
	onRetry(): void;
}

function Wrapper(props: WrapperProps) {
	return (
		<div className="">
			<header className="mb-4 flex items-center justify-between">
				<h2 className="flex-1 text-xl font-semibold">Available Feeds</h2>
				<button aria-label="Refresh" onClick={props.onRetry}>
					<svg
						width={24}
						height={24}
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth={2}
						strokeLinecap="round"
						strokeLinejoin="round"
						className="h-5 w-5 text-zinc-400"
						aria-hidden={true}>
						<use href="#icon-refresh" />
					</svg>
				</button>
			</header>

			{props.children}
		</div>
	);
}

interface FeedListProps {
	links: RSSLink[];
}

function FeedListItem(props: RSSLink) {
	return (
		<li className="cursor-pointer" key={props.href}>
			<div className="block px-2 py-4 hover:bg-zinc-200 dark:hover:bg-zinc-500">
				<div className="flex items-center gap-2">
					<div className="flex flex-shrink-0 items-center">
						<svg
							stroke="currentColor"
							fill="currentColor"
							strokeWidth={0}
							viewBox="0 0 24 24"
							className="h-6 w-6 text-sky-500 dark:text-sky-600"
							aria-hidden={true}>
							<use href="#icon-feed" />
						</svg>
					</div>
					<div className="flex-1">
						<div className="truncate">
							<div>
								<p className="truncate text-base font-bold text-sky-500 dark:text-sky-600">
									{props.title}
								</p>
								<p className="font-mono text-xs opacity-50">{props.href}</p>
							</div>
							<div className="mt-2 flex" />
						</div>
					</div>
					<div className="flex-shrink-0">
						<svg
							width={24}
							height={24}
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth={2}
							strokeLinecap="round"
							strokeLinejoin="round"
							className="h-5 w-5 text-zinc-400"
							aria-hidden={true}>
							<use href="#icon-chevron-right"></use>
						</svg>
					</div>
				</div>
			</div>
		</li>
	);
}

function FeedList(props: FeedListProps) {
	return (
		<div className="overflow-hidden rounded-md bg-white shadow dark:bg-zinc-800">
			<ul role="list" className="divide-y dark:divide-zinc-600">
				{props.links.map((item) => (
					<FeedListItem {...item} key={item.href} />
				))}
			</ul>
		</div>
	);
}

function LoadingSpinner() {
	return (
		<div className="flex justify-center">
			<div className="h-8 w-8 text-sky-500" role="alert" aria-busy="true">
				<svg viewBox="0 0 32 32" className="h-full w-full animate-spin">
					<circle
						cx={16}
						cy={16}
						fill="none"
						r={14}
						strokeWidth="4"
						stroke="currentColor"
						opacity={0.2}
					/>
					<circle
						cx={16}
						cy={16}
						fill="none"
						r={14}
						strokeWidth={4}
						stroke="currentColor"
						strokeDashoffset={60}
						strokeDasharray={80}
					/>
				</svg>
			</div>
		</div>
	);
}

interface AppProps {
	id: string;
	onParse(): Promise<RSSLink[]>;
}

function App(props: AppProps) {
	let query = useSWR<RSSLink[], Error>(["tab", props.id], props.onParse);

	let isEmpty = (query.data && query.data?.length === 0) || (!query.data && !query.error);

	return (
		<Wrapper onRetry={query.mutate}>
			{query.isLoading ? (
				<LoadingSpinner />
			) : isEmpty ? (
				<Empty />
			) : query.error ? (
				<ErrorMessage message={query.error.message} />
			) : query.data ? (
				<FeedList links={query.data} />
			) : null}
		</Wrapper>
	);
}

let domNode = document.getElementById("app");
let currentTabUrl = getTabURL();

let provider = () => new Map();

if (domNode !== null) {
	let root = createRoot(domNode);
	root.render(
		<SWRConfig
			value={{
				provider,
			}}>
			<App id={currentTabUrl} onParse={parseDocumentLinks} />
		</SWRConfig>
	);
}
