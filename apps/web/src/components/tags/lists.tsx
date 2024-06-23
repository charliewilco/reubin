import { getUserSession } from "$/lib/controllers/session";
import { getAll } from "$/lib/controllers/tag";
import { Label } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

interface TagListProps {
	selected?: string | null;
}

export async function TagSelectionList(props: TagListProps) {
	let result = await getUserSession();
	let tags = await getAll(result?.user?.id);

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
