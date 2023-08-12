"use client";

import { Sparkle } from "lucide-react";
import { quickMarkdownParse } from "$/utils/quick-markdown";
import { useMemo } from "react";

interface SummaryContainerProps {
	completion: string;
}

export function SummaryContainer(props: SummaryContainerProps) {
	let formatted = useMemo(
		() => quickMarkdownParse(props.completion.trimStart()),
		[props.completion]
	);
	return (
		<aside className="block rounded-lg border-8 border-sky-500/50 text-zinc-800 shadow-md  animate-in fade-in">
			<div className="rounded bg-gradient-to-tr from-sky-500 to-sky-300 px-8 py-6">
				<div className="flex items-center justify-between">
					<h3 className="mb-2 text-2xl font-bold">
						<div className="flex items-center">
							<Sparkle className="mr-4" /> AI Summary
						</div>
					</h3>
				</div>
				<div
					className="prose prose-sm font-mono"
					dangerouslySetInnerHTML={{
						__html: formatted,
					}}
				/>
			</div>
		</aside>
	);
}
