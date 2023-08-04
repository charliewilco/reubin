import { GalleryVerticalEnd, BookmarkMinus, BookmarkPlus, Sparkle } from "lucide-react";
import { extractArticle, addFavorite } from "$/actions";
import { experimental_useFormStatus } from "react-dom";
import { experimental_useOptimistic } from "react";
import { useCompletion } from "ai/react";
import { SummaryContainer } from "../summarization";

interface EntryToolbarProps {
	id: string;
	link: string;
	content: string;
	isFavorite: boolean;
	onExtract(value: string): void;
}

export function EntryToolbar(props: EntryToolbarProps) {
	let { pending } = experimental_useFormStatus();
	let [optimisticValue, addOptimisticValue] = experimental_useOptimistic(
		!!props.isFavorite,
		(state: boolean, _value?: string) => {
			return !!state;
		}
	);

	const { completion, input, complete } = useCompletion({
		api: "/api/completion",
		initialInput: `Summarize the following article in three bullet points:\n${props.content}`,
	});

	return (
		<div>
			<form className="mb-4 flex justify-end gap-4">
				<button
					formAction={() =>
						extractArticle(props.id, props.link).then((result) => {
							if (result !== null) {
								props.onExtract(result.content);
							}
						})
					}>
					<GalleryVerticalEnd />
				</button>
				<button formAction={async () => await complete(input)} disabled={!input}>
					<Sparkle />
				</button>
				<button
					title="Favorite Entry"
					formAction={async () => {
						addOptimisticValue("");
						await addFavorite(props.id);
					}}
					className="block">
					{pending ? "Hang on..." : optimisticValue ? <BookmarkMinus /> : <BookmarkPlus />}
				</button>
			</form>
			{completion && <SummaryContainer completion={completion} />}
		</div>
	);
}
