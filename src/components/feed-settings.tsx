"use client";

import { useCallback, useState } from "react";
import { Settings2, Trash2 } from "lucide-react";

import { Button, SuperButton } from "./ui/button";
import { Dialog, DialogTitle } from "./ui/dialog";
import { Input, Label, TextLabel } from "./ui/input";
import { TagSelectionList } from "./tag-lists";
import { useEventCallback } from "../hooks/useEventCallback";
import type { Feed, Tag } from "@prisma/client";

interface FeedSettingsFormProps {
	onSubmit(title: string, tagID?: string | null): void | Promise<void>;
	onDelete(): void | Promise<void>;
	initialFeed: Feed;
}

export function UpdateFeedForm(props: FeedSettingsFormProps) {
	const [fields, setFields] = useState({
		title: props.initialFeed.title,
		tag: props.initialFeed.tagId,
	});
	const data: any = {};

	const handleSubmit: React.FormEventHandler = useCallback(
		(event) => {
			if (event) {
				event.preventDefault();
			}

			props.onSubmit(fields.title, fields.tag);
		},
		[fields, props]
	);

	const handleTitleChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
		(event) =>
			setFields((prev) => {
				return {
					...prev,
					title: event.target.value,
				};
			}),
		[setFields]
	);

	const handleTagChange = useCallback((tag: Tag) => {
		setFields((prev) => {
			if (tag) {
				return {
					...prev,
					tag: tag.id,
				};
			}
			return {
				...prev,
				tag: null,
			};
		});
	}, []);

	const selected: Tag | null | undefined = data?.tags.find((t: any) => t?.id === fields.tag);

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<Label htmlFor="feed-title" aria-labelledby="feed-title">
				<TextLabel id="feed-title">Feed Name</TextLabel>

				<Input
					name="feed-title"
					data-testid="update-feed-name"
					value={fields.title}
					onChange={handleTitleChange}
				/>
			</Label>
			<Label>
				<TextLabel id="feed-title">Tag</TextLabel>

				{data && data.tags && (
					<TagSelectionList selected={selected} onChange={handleTagChange} />
				)}
			</Label>
			<div className="mt-8 flex items-center justify-between">
				<div className="block text-red-500">
					<Button
						type="button"
						aria-label="Remove Feed"
						className="flex items-center"
						onClick={props.onDelete}>
						<Trash2 size={18} />
						<span className="ml-2 text-sm font-semibold">Unsubscribe</span>
					</Button>
				</div>

				<SuperButton type="submit" aria-label="Update Feed">
					<span>Save</span>
				</SuperButton>
			</div>
		</form>
	);
}

export function FeedSettings() {
	const [isOpen, setOpen] = useState(false);

	const data: any = {};

	const handleRemove = useCallback(() => {
		try {
		} catch (error) {}
	}, []);

	const handleSubmit = useCallback((_title: string, _tagID?: string | null) => {
		try {
		} catch (error) {}
	}, []);

	const handleClose = useEventCallback(() => {
		setOpen(false);
	});

	return (
		<>
			<Button aria-label="Update feed" onClick={() => setOpen(true)}>
				<Settings2 />
			</Button>
			{data && data.feed && (
				<Dialog>
					<DialogTitle>Update feed {data.feed.title}</DialogTitle>
					<UpdateFeedForm
						initialFeed={data.feed}
						onSubmit={handleSubmit}
						onDelete={handleRemove}
					/>
				</Dialog>
			)}
		</>
	);
}
