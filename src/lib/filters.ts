export type EntryFilter = "all" | "favorite" | "unread";

export function createFilterParams(): { filter: EntryFilter }[] {
	return [{ filter: "all" }, { filter: "favorite" }, { filter: "unread" }];
}


export function getFilterFromString(value: string): EntryFilter {
	switch (value) {
		case "favorite":
		case "favorites":
			return "favorite";
		case "unread":
			return "unread";
		default:
			return "all";
	}
}
