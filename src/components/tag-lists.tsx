import { unstable_cache } from "next/cache";
import { Controllers } from "$/lib/controllers";
import { getUserSession } from "$/lib/auth";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/input";

interface TagListProps {
	selected?: string | null;
}

export async function TagSelectionList(props: TagListProps) {
	const { user } = await getUserSession();
	const tags = await unstable_cache(() => Controllers.tags.getAll(user?.userId), [], {
		tags: ["tag:all"],
	})();

	let value = props.selected === null ? undefined : props.selected;
	return (
		<RadioGroup defaultValue={value}>
			{tags.map((tag) => {
				let id = tag.title + tag.id;
				return (
					<div className="flex items-center space-x-2" key={tag.id}>
						<RadioGroupItem value={tag.id} id={id} />
						<Label htmlFor={id}>{tag.title}</Label>
					</div>
				);
			})}
		</RadioGroup>
	);
}
