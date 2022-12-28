"use client";
import { useCallback, useState } from "react";
import { Plus } from "lucide-react";

import { addFeed } from "../lib/graphql";

import { SuperButton, Button } from "./ui/button";
import { Label, Input, TextLabel } from "./ui/input";
import { Dialog } from "./ui/dialog";

interface AddFeedFormProps {
	onSubmit(url: string): void | Promise<void>;
	onSelect?(selectedFeed: unknown): void | Promise<void>;
}

export function AddFeedForm(props: AddFeedFormProps) {
	const [url, setUrl] = useState("");

	const handleSubmit: React.FormEventHandler = useCallback(
		(event) => {
			if (event) {
				event.preventDefault();
			}

			if (url === "") {
				return;
			}

			props.onSubmit(url);
		},
		[url, props]
	);

	const handleChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
		(event) => {
			setUrl(event.target.value);
		},
		[setUrl]
	);

	return (
		<form onSubmit={handleSubmit}>
			<Label htmlFor="url">
				<TextLabel>URL</TextLabel>

				<Input
					name="url"
					id="url"
					data-testid="add-feed-url"
					value={url}
					onChange={handleChange}
				/>
			</Label>

			<div className="mt-8 flex justify-end">
				<SuperButton type="submit">Submit</SuperButton>
			</div>
		</form>
	);
}

export function AddFeed() {
	const [isOpen, setOpen] = useState(false);
	const handleSubmit = useCallback((url: string) => {
		addFeed(url);
	}, []);

	return (
		<>
			<Button onClick={() => setOpen(true)} aria-label="Add Feed" className="block">
				<Plus size={24} />
			</Button>
			<Dialog isOpen={isOpen} onClose={() => setOpen(false)} title="Add Feed">
				<div className="mt-2 mb-8 text-sm opacity-50" data-testid="add-feed-modal">
					Make changes to your profile here. Click save when you&apos;re done.
				</div>
				<AddFeedForm onSubmit={handleSubmit} />
			</Dialog>
		</>
	);
}
