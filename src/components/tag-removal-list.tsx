import * as React from "react";
import { removeTag } from "$/actions";
import type { Tag } from "@prisma/client";
import { Trash2 } from "lucide-react";
import { getUserSession } from "$/lib/auth";
import { unstable_cache } from "next/cache";
import { Controllers } from "$/lib/controllers";

export async function TagRemovalList() {
	const { user } = await getUserSession();
	let cachedTags = unstable_cache(
		(user) => {
			return Controllers.tags.getAll(user.userId);
		},
		["tags", "all"],
		{
			tags: ["tag:all"],
		}
	);
	const tags = await cachedTags(user);

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
