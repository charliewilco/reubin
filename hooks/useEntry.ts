import { useEffect } from "react";
import useSWR from "swr";
import { getEntry, markAsRead } from "../lib/fetcher";

export const useEntry = (id: string) => {
	const { error, data, mutate, isValidating } = useSWR(id, getEntry);

	const isLoading = !error && !data;

	useEffect(() => {
		async function mutator() {
			console.log("Running mutation");
			await markAsRead(id);

			mutate(
				async (data) => {
					if (data) {
						return {
							...data,
							unread: false,
						};
					}
				},
				{ rollbackOnError: true }
			);
		}
		console.log(data?.entry);
		if (data?.entry.unread) {
			mutator();
		}
	}, [data?.entry, mutate, id]);

	return {
		error,
		data,
		mutate,
		isValidating,
		isLoading,
	};
};
