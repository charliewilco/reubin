import useSWR from "swr";
import { getEntriesFromFeed } from "../lib/fetcher";

export const useEntries = (id: string) => {
	const { data, error, isValidating, mutate } = useSWR(id, getEntriesFromFeed);

	const isLoading = !error && !data;

	return {
		data,
		error,
		isValidating,
		mutate,
		isLoading,
	};
};
