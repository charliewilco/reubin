export type EntryFilter = "all" | "favorite" | "unread";

export function createFilterParams(): { filter: EntryFilter }[] {
	return [{ filter: "all" }, { filter: "favorite" }, { filter: "unread" }];
}
