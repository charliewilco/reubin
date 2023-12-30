import { Sparkle } from "lucide-react";

export function SummarizationHeader() {
	return (
		<div className="flex items-center justify-between">
			<h3 className="mb-2 text-2xl font-bold">
				<div className="flex items-center">
					<Sparkle className="mr-4" /> AI Summary
				</div>
			</h3>
		</div>
	);
}
