"use client";

import useSWR from "swr";
import { useCallback } from "react";
import { addTag, getAllTags, removeTag } from "../lib/graphql";
import type { TagInfoFragment } from "../lib/__generated__";

export function useTags() {
  const { mutate, ...response } = useSWR("ALL_TAGS", getAllTags);

  const addTagCallback = useCallback(
    async (name: string) => {
      await addTag(name).then((tag) => {
        mutate((prev) => ({
          ...prev,
          tags: [...(prev?.tags ?? []), tag.addTag],
        }));
      });
    },
    [mutate]
  );

  const removeTagCallback = useCallback(
    async (tag: TagInfoFragment) => {
      await removeTag(tag.id).then((data) => {
        mutate((prev) => {
          const tags = Array.from(prev?.tags ?? []);

          const index = tags.findIndex((_tag) => data.removeTag.id === _tag?.id);

          if (index > -1) {
            tags.splice(index, 1);
          }

          return {
            ...prev,
            tags,
          };
        });
      });
    },
    [mutate]
  );

  return {
    ...response,
    mutate,
    addTag: addTagCallback,
    removeTag: removeTagCallback,
  };
}
