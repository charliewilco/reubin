import { RadioGroup } from "@headlessui/react";
import { CheckCircle, Trash2 } from "lucide-react";
import { classNames } from "./ui/class-names";
import type { TagInfoFragment } from "../lib/__generated__";
import { useTags } from "../hooks/useTags";
import { LoadingIndicator } from "./ui/activity-indicator";

interface TagSelectionListProps {
  selected?: TagInfoFragment | null;
  onChange(value: TagInfoFragment): void;
}

export function TagSelectionList(props: TagSelectionListProps) {
  const { data, error } = useTags();

  let content;

  const isLoading = !error && !data;

  if (isLoading) {
    content = (
      <div className="flex items-center justify-center">
        <LoadingIndicator />
      </div>
    );
  }

  if (data) {
    content = data.tags
      .filter((t) => t !== null)
      .map((tag) => (
        <RadioGroup.Option
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
                <RadioGroup.Label
                  as="span"
                  className={classNames(
                    "mr-4 font-medium",
                    checked ? "text-sky-500" : "text-gray-900 dark:text-white"
                  )}>
                  {tag!.title}
                </RadioGroup.Label>

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
        </RadioGroup.Option>
      ));
  }

  return (
    <RadioGroup value={props.selected} className="select-none" onChange={props.onChange}>
      <RadioGroup.Label className="sr-only">Selected Tag</RadioGroup.Label>
      <div className="flex flex-wrap gap-2">
        {content}

        <RadioGroup.Option key="null" value={null}>
          <span className="flex w-full items-center justify-between">
            <RadioGroup.Label as="span">No Tag</RadioGroup.Label>
          </span>
        </RadioGroup.Option>
      </div>
    </RadioGroup>
  );
}

interface TagListItemProps {
  tag: TagInfoFragment;
  onDelete(tag: TagInfoFragment): void;
}

export function TagListItem({ tag, onDelete }: TagListItemProps) {
  const handleDelete = () => {
    onDelete(tag);
  };

  return (
    <li key={tag.id} className="flex items-center justify-between pb-2">
      <span>{tag.title}</span>
      <button onClick={handleDelete} aria-label="Remove Tag">
        <Trash2 />
      </button>
    </li>
  );
}

export function TagRemovalList() {
  const { data, error, removeTag } = useTags();

  let content;

  const isLoading = !error && !data;

  if (isLoading) {
    content = (
      <div className="flex items-center justify-center">
        <LoadingIndicator />
      </div>
    );
  }

  if (data) {
    if (data.tags.length === 0) {
      content = <p className="text-center">No Tags</p>;
    } else {
      content = (
        <ul>
          {data.tags
            .filter((t) => t !== null)
            .map((tag) => {
              return <TagListItem key={tag?.id} tag={tag!} onDelete={removeTag} />;
            })}
        </ul>
      );
    }
  }

  return <div>{content}</div>;
}
