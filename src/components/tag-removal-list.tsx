import { removeTag } from "$/actions";
import type { Tag } from "@prisma/client";
import { Trash2 } from "lucide-react";

interface TagListItemProps {
	tag: Tag;
	onDelete(tag: Tag): void;
}

export function TagListItem({ tag, onDelete }: TagListItemProps) {
	const handleDelete = () => {
		onDelete(tag);
	};

	return (
		<li key={tag.id} className="pb-2">
			<form className="flex items-center justify-between ">
				<span>{tag.title}</span>
				<input type="hidden" name="id" value={tag.id} />
				<button formAction={removeTag} aria-label="Remove Tag">
					<Trash2 className="h-4 w-4" />
				</button>
			</form>
		</li>
	);
}

interface TagListProps {
	tags: Tag[];
}

export function TagRemovalList(props: TagListProps) {
	let content;

	if (props.tags) {
		if (props.tags.length === 0) {
			content = <p className="text-center">No Tags</p>;
		} else {
			content = (
				<ul>
					{props.tags
						.filter((t) => t !== null)
						.map((tag) => {
							return <TagListItem key={tag?.id} tag={tag!} onDelete={() => {}} />;
						})}
				</ul>
			);
		}
	}

	return <div>{content}</div>;
}
