import { Trash2 } from "lucide-react";
import { removeTag } from "$/actions";
import { Controllers } from "$/lib/controllers";
import { Services } from "$/lib/services";

export async function TagRemovalList() {
	let { user } = await Services.getUserSession();
	let tags = await Controllers.tags.getAll(user?.userId);

	let content;

	if (tags) {
		if (tags.length === 0) {
			content = <p className="text-center">No Tags</p>;
		} else {
			content = (
				<ul>
					{tags.map((tag) => {
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
					})}
				</ul>
			);
		}
	}

	return <div>{content}</div>;
}
