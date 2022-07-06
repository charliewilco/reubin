import useSWR from "swr";
import { getFeeds } from "../lib/fetcher";

export const useFeedList = () => {
	const { data, error, isValidating, mutate } = useSWR("feeds", getFeeds);

	const isLoading = !error && !data;

	return {
		data,
		error,
		isValidating,
		mutate,
		isLoading,
	};
};
