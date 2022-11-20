"use client";

import { useEffect } from "react";
import useSWR from "swr";
import { LoadingIndicator } from "./ui/activity-indicator";
import { getEntry, markAsRead } from "../lib/graphql";
import { useDashboardContext } from "../hooks/useDashboard";

interface EntryFullProps {
	id: string;
}

export function EntryFull(props: EntryFullProps) {
	const { error, data, mutate } = useSWR(props.id, getEntry);

	const isLoading = !error && !data;

	useEffect(() => {
		async function mutator() {
			await markAsRead(props.id);

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
		if (data?.entry.unread) {
			mutator();
		}
	}, [data?.entry, mutate, props.id]);

	if (isLoading) {
		return <LoadingIndicator />;
	}

	if (error) {
		return <div>{error.toString()}</div>;
	}

	if (data) {
		return (
			<div className="absolute top-0 left-0 right-0 bottom-0 w-full ">
				<article className="mx-auto max-w-2xl px-8 pb-16">
					<header className="py-8">
						<h1 className="text-3xl font-bold">{data.entry?.title}</h1>
					</header>
					<section className="prose prose-invert max-w-none">
						<div dangerouslySetInnerHTML={{ __html: data.entry?.content ?? "" }} />
					</section>
				</article>
			</div>
		);
	}

	return null;
}

export function ConnectedEntryFull() {
	const [{ entry }] = useDashboardContext();

	if (entry) {
		return <EntryFull id={entry} />;
	}

	return null;
}
