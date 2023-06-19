import { Controllers } from "$/lib/controllers";
import { Auth } from "$/lib/auth";
import { cookies } from "next/headers";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/input";

interface TagListProps {
	selected?: string | null;
}

export async function TagSelectionList(props: TagListProps) {
	let authRequest = Auth.handleRequest({ cookies: cookies });
	const { user } = await authRequest.validateUser();
	const tags = await Controllers.tags.getAll(user.userId);

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
