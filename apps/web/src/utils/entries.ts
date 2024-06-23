import type { Entry } from "@prisma/client";
import { sortGenericByNearest } from "./dates";

export function getDateString(date: Date | string) {
	return new Date(date).toDateString();
}

let extractor = (a: Entry) => a.pubDate;

export function sortEntriesByNearest(a: Entry, b: Entry) {
	return sortGenericByNearest<Entry>({ a, b }, extractor);
}
