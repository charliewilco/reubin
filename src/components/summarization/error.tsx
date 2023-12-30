import { ShieldAlert } from "lucide-react";

interface SummarizationErrorProps {
	status: number | string;
	message: string;
}

export function SummarizationError(props: SummarizationErrorProps) {
	return (
		<aside className="block rounded-lg border-8 border-red-500/50 text-zinc-800 shadow-md animate-in fade-in">
			<div className="rounded bg-gradient-to-tr from-red-500 to-red-300 px-8 py-6">
				<div className="flex items-center justify-between">
					<h3 className="mb-2 text-2xl font-bold">
						<div className="flex items-center">
							<ShieldAlert className="mr-4" /> Error {props.status}
						</div>
					</h3>
				</div>
				<div className="prose prose-sm font-mono">{props.message}</div>
			</div>
		</aside>
	);
}
