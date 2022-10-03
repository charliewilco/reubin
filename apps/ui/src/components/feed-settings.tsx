import useSWR, { mutate } from "swr";
import { useCallback, useState } from "react";
import { FiSettings, FiTrash2 } from "react-icons/fi";

import { Button, SuperButton } from "./ui/button";
import { Dialog } from "./ui/dialog";
import { removeFeed, updateFeedTitle, getAllTags } from "../lib/graphql";
import { Input, Label, TextLabel } from "./ui/input";
import { useDashboardContext } from "../hooks/useDashboard";
import { TagSelectionList } from "./ui/tag-selection-list";
import { TagInfoFragment } from "../lib/__generated__";

interface FeedSettingsFormProps {
  initialTitle: string;
  initialTag?: TagInfoFragment;
  onSubmit(title: string): void | Promise<void>;
  onDelete(): void | Promise<void>;
}

/**
 *
 * @TODO: Use id to fetch full feed info and then render form
 * Remove the concept of initialTitle and initialTag
 */

export const UpdateFeedForm = (props: FeedSettingsFormProps) => {
  const [title, setTitle] = useState(props.initialTitle);
  const [selectedTag, setTagId] = useState(props.initialTag);
  const { data } = useSWR("tags", getAllTags);

  const handleSubmit: React.FormEventHandler = useCallback(
    (event) => {
      if (event) {
        event.preventDefault();
      }

      props.onSubmit(title);
    },
    [title, props]
  );

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => setTitle(event.target.value),
    [setTitle]
  );

  return (
    <form onSubmit={handleSubmit}>
      <Label htmlFor="feed-title" aria-labelledby="feed-title">
        <Input
          name="feed-title"
          data-testid="update-feed-name"
          value={title}
          onChange={handleChange}
        />
        <TextLabel id="feed-title">Feed Names</TextLabel>
      </Label>
      <Label>
        {data && data.tags && (
          <TagSelectionList selected={selectedTag} tags={data.tags} onChange={setTagId} />
        )}
      </Label>
      <div className="mt-8 flex items-center justify-between">
        <div className="block text-red-500">
          <Button
            type="button"
            aria-label="Remove Feed"
            className="flex items-center"
            onClick={props.onDelete}>
            <FiTrash2 size={18} />
            <span className="ml-2 text-sm font-semibold">Unsubscribe</span>
          </Button>
        </div>

        <SuperButton type="submit" aria-label="Update Feed">
          <span>Save</span>
        </SuperButton>
      </div>
    </form>
  );
};

export const FeedSettings = () => {
  const [isOpen, setOpen] = useState(false);

  const [{ feed }, { unselectFeed }] = useDashboardContext();

  const handleRemove = useCallback(() => {
    if (feed) {
      try {
        removeFeed(feed.id).then(() => {
          setOpen(false);
          unselectFeed();
          mutate("feeds");
        });
      } catch (error) {}
    }
  }, [feed, unselectFeed]);

  const handleSubmit = useCallback(
    (title: string) => {
      if (feed) {
        try {
          updateFeedTitle(title, feed.id).then(() => {
            setOpen(false);
            mutate("feeds");
          });
        } catch (error) {}
      }
    },
    [feed]
  );

  return (
    <>
      <Button aria-label="Update feed" onClick={() => setOpen(true)}>
        <FiSettings />
      </Button>
      <Dialog
        isOpen={isOpen}
        onClose={() => setOpen(false)}
        title={`Update feed "${feed?.title}"`}>
        <UpdateFeedForm
          initialTitle={feed?.title || ""}
          onSubmit={handleSubmit}
          onDelete={handleRemove}
        />
      </Dialog>
    </>
  );
};
