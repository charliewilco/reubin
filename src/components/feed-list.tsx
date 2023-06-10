"use client";

import { memo, useCallback, useMemo } from "react";
import isEqual from "react-fast-compare";
import useSWR from "swr";
import { useDashboardContext } from "../hooks/useDashboard";
import { getFeeds } from "../lib/graphql";
import { mapTagsToFeed } from "../lib/map-tags-feed";
import type { GetFeedsQuery } from "../lib/__generated__";
import { LoadingIndicator } from "./ui/activity-indicator";
import { classNames } from "./ui/class-names";
import { TagWithFeeds } from "./ui/tag-with-feeds";

interface FeedItemProps {
	id: string;
	title: string;
	selected: null | string;
	onSelect(id: string, title: string): void;
}

export function FeedItem(props: FeedItemProps) {
	const handleSelect = () => {
		if (props.id) {
			props.onSelect(props.id, props.title);
		}
	};

	const isSelected = useMemo(() => props.id === props.selected, [props]);

	const listProps = isSelected ? { "data-testid": "selected" } : {};
	return (
		<li
			{...listProps}
			key={props.id}
			className={classNames("cursor-pointer p-2", isSelected && "bg-sky-500/50 text-white")}>
			<div className="flex justify-between">
				<div onClick={handleSelect} className="flex-1">
					<h2 className="text-base">{props.title}</h2>
				</div>
			</div>
		</li>
	);
}

interface FeedsSortedByTagProps extends GetFeedsQuery {}

function SortedByTags(props: FeedsSortedByTagProps) {
	const [{ feed: selectedFeed }, { selectFeed }] = useDashboardContext();

	const sorted = useMemo(() => mapTagsToFeed(props), [props]);

	const getTitle = useCallback(
		(tagID: string) => {
			const tag = props.tags.find((t) => t?.id === tagID);
			return tag?.title;
		},
		[props]
	);

	return (
		<div>
			{sorted.map(([tagID, feeds]) => {
				if (tagID == null) {
					return (
						<ul role="list" key="null-tag">
							{feeds.map((feed) =>
								feed === null ? null : (
									<FeedItem
										key={feed?.id}
										id={feed?.id}
										title={feed?.title}
										onSelect={selectFeed}
										selected={selectedFeed}
									/>
								)
							)}
						</ul>
					);
				} else {
					return (
						<div key={tagID}>
							<TagWithFeeds title={getTitle(tagID) ?? ""}>
								<ul role="list">
									{feeds.map((feed) =>
										feed === null ? null : (
											<FeedItem
												key={feed?.id}
												id={feed?.id}
												title={feed?.title}
												onSelect={selectFeed}
												selected={selectedFeed}
											/>
										)
									)}
								</ul>
							</TagWithFeeds>
						</div>
					);
				}
			})}
		</div>
	);
}

const FeedListSortedByTag = memo(SortedByTags, isEqual);

FeedListSortedByTag.displayName = "MemoFeedsSortedByTag";

interface FeedListProps {
	initialData?: GetFeedsQuery;
}

export function FeedList(props: FeedListProps) {
	const { data, error } = useSWR("feeds", getFeeds, {
		fallbackData: props.initialData,
	});

	const isLoading = !error && !data;

	if (isLoading) {
		return <LoadingIndicator />;
	}

	if (error) {
		return <div>{error.toString()}</div>;
	}

	if (data) {
		if (data.feeds.length === 0) {
			return (
				<div className=" p-4 text-center">
					<p>Looks like you have no feeds.</p>
				</div>
			);
		}

		return (
			<div className="absolute top-0 bottom-0 left-0 right-0 w-full">
				<FeedListSortedByTag {...data} />
			</div>
		);
	}

	return null;
}
