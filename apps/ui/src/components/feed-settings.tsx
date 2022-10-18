import useSWR, { mutate } from "swr";
import { useCallback, useState } from "react";
import { Settings2, Trash2 } from "lucide-react";

import { Button, SuperButton } from "./ui/button";
import { Dialog } from "./ui/dialog";
import { Input, Label, TextLabel } from "./ui/input";
import { removeFeed, updateFeedTitle, getAllTags, getFeed } from "../lib/graphql";
import type { FeedDetailsFragment, TagInfoFragment } from "../lib/__generated__";
import { useDashboardContext } from "../hooks/useDashboard";
import { TagSelectionList } from "./tag-lists";

interface FeedSettingsFormProps {
  onSubmit(title: string, tagID?: string | null): void | Promise<void>;
  onDelete(): void | Promise<void>;
  initialFeed: FeedDetailsFragment;
}

export function UpdateFeedForm(props: FeedSettingsFormProps) {
  const [fields, setFields] = useState({
    title: props.initialFeed.title,
    tag: props.initialFeed.tag,
  });
  const { data } = useSWR("all-tags", getAllTags);

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
    console.log(tag);
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

  const selected: TagInfoFragment | null | undefined = data?.tags.find(
    (t) => t?.id === fields.tag
  );

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
        <Settings2 />
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
}
