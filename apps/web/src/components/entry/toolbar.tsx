"use client";

import { addFavorite, extractArticle } from "$/app/actions";
import { BookmarkMinus, BookmarkPlus, GalleryVerticalEnd, Sparkle } from "lucide-react";
import { useOptimistic, useState } from "react";
import { useFormStatus } from "react-dom";

interface EntryToolbarProps {
	id: string;
	link: string;
	content: string;
	isFavorite: boolean;
	onExtract(value: string): void;
	children?: React.ReactNode;
}

export function EntryToolbar(props: EntryToolbarProps) {
	let { pending } = useFormStatus();
	let [optimisticValue, addOptimisticValue] = useOptimistic(
		!!props.isFavorite,
		(state: boolean, _value?: string) => {
			return !!state;
		},
	);

	let [_completion, setCompletion] = useState(false);

	return (
		<div>
			<form className="mb-4 flex justify-end gap-4">
				<button
					type="button"
					formAction={() =>
						extractArticle(props.id, props.link).then((result) => {
							if (result !== null) {
								props.onExtract(result.content);
							}
						})
					}
				>
					<GalleryVerticalEnd />
				</button>
				<button type="button" onClick={() => setCompletion(true)} disabled={_completion}>
					<Sparkle />
				</button>
				<button
					type="button"
					title="Favorite Entry"
					formAction={async () => {
						addOptimisticValue("");
						await addFavorite(props.id);
					}}
					className="block"
				>
					{pending ? "Hang on..." : optimisticValue ? <BookmarkMinus /> : <BookmarkPlus />}
				</button>
			</form>
			{_completion && props.children}
		</div>
	);
}
