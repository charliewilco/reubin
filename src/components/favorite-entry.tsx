"use client";
import { addFavorite } from "$/actions";
import { BookmarkPlus, BookmarkMinus } from "lucide-react";
import { experimental_useOptimistic } from "react";
import { experimental_useFormStatus } from "react-dom";

interface FavoriteEntryProps {
	id: string;
	isFavorite: boolean;
}

export function FavoriteEntry(props: FavoriteEntryProps) {
	let { pending } = experimental_useFormStatus();
	let [optimisticValue, addOptimisticValue] = experimental_useOptimistic(
		!!props.isFavorite,
		(state: boolean, _value?: string) => {
			return !!state;
		}
	);
	return (
		<form
			className="block"
			action={async (formData: FormData) => {
				let id = formData.get("id")?.toString();

				if (id) {
					addOptimisticValue("");
					await addFavorite(id);
				}
			}}>
			<input type="hidden" name="id" value={props.id} />

			<button title="Favorite Entry" type="submit" className="block">
				{pending ? "Hang on..." : optimisticValue ? <BookmarkMinus /> : <BookmarkPlus />}
			</button>
		</form>
	);
}
