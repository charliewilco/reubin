"use client";
import { addFavorite } from "$/actions";
import { BookmarkPlus, BookmarkMinus } from "lucide-react";
import { useOptimistic } from "react";
import { useFormStatus } from "react-dom";

interface FavoriteEntryProps {
	id: string;
	isFavorite: boolean;
}

export function FavoriteEntry(props: FavoriteEntryProps) {
	let { pending } = useFormStatus();
	let [optimisticValue, addOptimisticValue] = useOptimistic(
		!!props.isFavorite,
		(state: boolean, _value?: string) => {
			return !!state;
		},
	);
	return (
		<form className="block">
			<button
				title="Favorite Entry"
				formAction={async () => {
					addOptimisticValue("");
					await addFavorite(props.id);
				}}
				type="submit"
				className="block">
				{pending ? "Hang on..." : optimisticValue ? <BookmarkMinus /> : <BookmarkPlus />}
			</button>
		</form>
	);
}
