"use client";

import type { Tag } from "@prisma/client";
import { RadioGroup as _RadioGroup } from "@headlessui/react";
import { CheckCircle, Trash2 } from "lucide-react";
import {} from "./ui/radio-group";
import { classNames } from "./ui/class-names";
import { LoadingIndicator } from "./ui/activity-indicator";
import { useCallback } from "react";

interface TagListProps {
	initialData?: Tag[];
}

interface TagSelectionListProps extends TagListProps {
	selected?: Tag | null;
	onChange(value: Tag): void;
}

export function TagSelectionList(props: TagSelectionListProps) {
	let content;

	const isLoading = !props.initialData;

	if (isLoading) {
		content = (
			<div className="flex items-center justify-center">
				<LoadingIndicator />
			</div>
		);
	}

	if (props.initialData) {
		content = props.initialData
			.filter((t) => t !== null)
			.map((tag) => (
				<_RadioGroup.Option
					key={tag!.id}
					value={tag}
					className={({ checked, active }) =>
						classNames(
							checked ? "border-transparent" : "border-zinc-300 dark:border-zinc-500",
							active ? "border-sky-500 ring-2 ring-sky-500" : "",
							"relative block cursor-pointer rounded-lg border bg-white px-2 py-2 shadow-sm focus:outline-none dark:bg-zinc-700 sm:flex sm:justify-between"
						)
					}>
					{({ active, checked }) => (
						<>
							<span className="flex w-full items-center justify-between">
								<_RadioGroup.Label
									as="span"
									className={classNames(
										"mr-4 font-medium",
										checked ? "text-sky-500" : "text-gray-900 dark:text-white"
									)}>
									{tag!.title}
								</_RadioGroup.Label>

								<CheckCircle
									className={classNames(!checked ? "invisible" : "", "h-4 w-4 text-sky-500")}
									aria-hidden="true"
								/>
							</span>

							<span
								className={classNames(
									active ? "border" : "border-2",
									checked ? "border-sky-500" : "border-transparent",
									"pointer-events-none absolute -inset-px rounded-lg"
								)}
								aria-hidden="true"></span>
						</>
					)}
				</_RadioGroup.Option>
			));
	}

	return (
		<_RadioGroup value={props.selected} className="select-none" onChange={props.onChange}>
			<_RadioGroup.Label className="sr-only">Selected Tag</_RadioGroup.Label>
			<div className="flex flex-wrap gap-2">
				{content}

				<_RadioGroup.Option key="null" value={null}>
					<span className="flex w-full items-center justify-between">
						<_RadioGroup.Label as="span">No Tag</_RadioGroup.Label>
					</span>
				</_RadioGroup.Option>
			</div>
		</_RadioGroup>
	);
}

interface TagListItemProps {
	tag: Tag;
	onDelete(tag: Tag): void;
}

export function TagListItem({ tag, onDelete }: TagListItemProps) {
	const handleDelete = () => {
		onDelete(tag);
	};

	return (
		<li key={tag.id} className="flex items-center justify-between pb-2">
			<span>{tag.title}</span>
			<button onClick={handleDelete} aria-label="Remove Tag">
				<Trash2 className="h-4 w-4" />
			</button>
		</li>
	);
}
