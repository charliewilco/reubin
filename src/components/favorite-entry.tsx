import { Star } from "lucide-react";

interface FavoriteEntryProps {
	id: string;
	isFavorite?: boolean;
}

export function FavoriteEntry(props: FavoriteEntryProps) {
	return (
		<form>
			<input type="hidden" name="id" value={props.id} />

			<button title="Favorite Entry">
				<Star />
			</button>
		</form>
	);
}
