import type { Entry, Feed } from "@prisma/client";
import useSWR, { type SWRConfiguration } from "swr";

async function fetcher<T>(input: RequestInfo, init?: RequestInit): Promise<T> {
	const response = await fetch(input, init);

	// check if the response is ok
	if (!response.ok) {
		throw new Error("An error occurred while fetching the data.");
	}

	return response.json() as Promise<T>;
}

interface EntriesResponse {
	data: {
		entries: Entry[];
	};
}
export function useEntries(
	feedId: string,
	config?: Partial<SWRConfiguration<EntriesResponse>>
) {
	return useSWR<EntriesResponse>(`/api/feed/${feedId}/entries`, fetcher, config);
}

interface FeedResponse {
	data: Feed;
}

export function useFeed(id: string, config?: Partial<SWRConfiguration<FeedResponse>>) {
	return useSWR<FeedResponse>(`/api/feed/${id}`, fetcher, config);
}

interface EntryResponse {
	data: Entry;
}

export function useEntry(id: string, config?: Partial<SWRConfiguration<EntryResponse>>) {
	return useSWR<EntryResponse>(`/api/entry/${id}`, fetcher, config);
}
