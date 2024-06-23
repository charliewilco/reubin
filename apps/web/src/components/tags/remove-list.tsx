import { removeTag } from "$/app/actions";
import { getUserSession } from "$/lib/controllers/session";
import { getAll } from "$/lib/controllers/tag";
import { Trash2 } from "lucide-react";

export async function TagRemovalList() {
	let result = await getUserSession();
	let tags = await getAll(result?.user?.id);

	return (
		<div>
			{tags?.length === 0 ? (
				<p className="text-center">No Tags</p>
			) : (
				<ul>
					{tags.map((tag) => {
						return (
							<li key={tag.id} className="pb-2">
								<form className="flex items-center justify-between ">
									<span>{tag.title}</span>
									<input type="hidden" name="id" value={tag.id} />
									<button formAction={removeTag} type="button" aria-label="Remove Tag">
										<Trash2 className="h-4 w-4" />
									</button>
								</form>
							</li>
						);
					})}
				</ul>
			)}
		</div>
	);
}
