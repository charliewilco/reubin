import { SummarizationHeader } from "./header";

export function SummarizationWrapper(props: { children: React.ReactNode }) {
	return (
		<aside className="block rounded-lg border-8 border-sky-500/50 text-zinc-800 shadow-md  animate-in fade-in">
			<div className="rounded bg-gradient-to-tr from-sky-500 to-sky-300 px-8 py-6">
				<SummarizationHeader />

				<div className="prose prose-sm font-mono">{props.children}</div>
			</div>
		</aside>
	);
}
