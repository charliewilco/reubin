import useSWR, { mutate } from "swr";
import { useCallback, useState } from "react";
import { FiSettings, FiTrash2 } from "react-icons/fi";

import { Button, SuperButton } from "./ui/button";
import { Dialog } from "./ui/dialog";
import { removeFeed, updateFeedTitle, getAllTags, getFeed } from "../lib/graphql";
import { Input, Label, TextLabel } from "./ui/input";
import { useDashboardContext } from "../hooks/useDashboard";
import { TagSelectionList } from "./ui/tag-selection-list";
import type { FeedDetailsFragment, TagInfoFragment } from "../lib/__generated__";

interface FeedSettingsFormProps {
  onSubmit(title: string, tagID?: string | null): void | Promise<void>;
  onDelete(): void | Promise<void>;
  initialFeed: FeedDetailsFragment;
}

export const UpdateFeedForm = (props: FeedSettingsFormProps) => {
  const [fields, setFields] = useState({
    title: props.initialFeed.title,
    tag: props.initialFeed.tag,
  });
  const { data } = useSWR("tags", getAllTags);

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

  const handleTagChange = useCallback((tag: TagInfoFragment) => {
    setFields((prev) => {
      return {
        ...prev,
        tag: tag.id,
      };
    });
  }, []);

  const selected: TagInfoFragment | null | undefined = data?.tags.find(
    (t) => t?.id === fields.tag
  );

  return (
    <form onSubmit={handleSubmit}>
      <Label htmlFor="feed-title" aria-labelledby="feed-title">
        <Input
          name="feed-title"
          data-testid="update-feed-name"
          value={fields.title}
          onChange={handleTitleChange}
        />
        <TextLabel id="feed-title">Feed Names</TextLabel>
      </Label>
      <Label>
        {data && data.tags && (
          <TagSelectionList selected={selected} tags={data.tags} onChange={handleTagChange} />
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
  const { data } = useSWR(feed, getFeed);

  const handleRemove = useCallback(() => {
    if (feed) {
      try {
        removeFeed(feed).then(() => {
          setOpen(false);
          unselectFeed();
          mutate("feeds");
        });
      } catch (error) {}
    }
  }, [feed, unselectFeed]);

  const handleSubmit = useCallback(
    (title: string, tagID?: string | null) => {
      if (feed) {
        try {
          updateFeedTitle(feed, {
            title,
            tagID,
          }).then(() => {
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
      {data && data.feed && (
        <Dialog
          isOpen={isOpen}
          onClose={() => setOpen(false)}
          title={`Update feed "${data.feed.title}"`}>
          <UpdateFeedForm
            initialFeed={data.feed}
            onSubmit={handleSubmit}
            onDelete={handleRemove}
          />
        </Dialog>
      )}
    </>
  );
};
