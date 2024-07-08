import type { Entry } from "@prisma/client";
import Utils from "@r/utils";

export function getDateString(date: Date | string) {
	return new Date(date).toDateString();
}

let extractor = (a: Entry) => a.pubDate;

export function sortEntriesByNearest(a: Entry, b: Entry) {
	return Utils.Dates.sortGenericByNearest<Entry>({ a, b }, extractor);
}
