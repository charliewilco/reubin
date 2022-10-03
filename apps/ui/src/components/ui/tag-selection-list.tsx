import { RadioGroup } from "@headlessui/react";
import { classNames } from "./class-names";
import type { TagInfoFragment } from "../../lib/__generated__";

interface TagSelectionListProps {
  tags: (TagInfoFragment | null)[];
  selected?: TagInfoFragment;
  onChange(value: TagInfoFragment): void;
}

export function TagSelectionList(props: TagSelectionListProps) {
  return (
    <RadioGroup value={props.selected} onChange={props.onChange}>
      <RadioGroup.Label className="sr-only"> Server size </RadioGroup.Label>
      <div className="space-y-4">
        {props.tags
          .filter((t) => t !== null)
          .map((tag) => (
            <RadioGroup.Option
              key={tag!.id}
              value={tag}
              className={({ checked, active }) =>
                classNames(
                  checked ? "border-transparent" : "border-gray-300",
                  active ? "border-indigo-500 ring-2 ring-indigo-500" : "",
                  "relative block cursor-pointer rounded-lg border bg-white px-6 py-4 shadow-sm focus:outline-none sm:flex sm:justify-between"
                )
              }>
              {({ active, checked }) => (
                <>
                  <span className="flex items-center">
                    <span className="flex flex-col text-sm">
                      <RadioGroup.Label as="span" className="font-medium text-gray-900">
                        {tag!.title}
                      </RadioGroup.Label>
                    </span>
                  </span>
                  <RadioGroup.Description
                    as="span"
                    className="mt-2 flex text-sm sm:mt-0 sm:ml-4 sm:flex-col sm:text-right">
                    Some Tag
                  </RadioGroup.Description>
                  <span
                    className={classNames(
                      active ? "border" : "border-2",
                      checked ? "border-indigo-500" : "border-transparent",
                      "pointer-events-none absolute -inset-px rounded-lg"
                    )}
                    aria-hidden="true"
                  />
                </>
              )}
            </RadioGroup.Option>
          ))}
      </div>
    </RadioGroup>
  );
}
