import type { Entry } from "@prisma/client";
import useSWR from "swr";

export function useEntries(feedId: string) {
	return useSWR<Entry[]>(`/api/feed/${feedId}/entries`);
}
