import { Button, SuperButton } from "./ui/button";
import { Dialog } from "./ui/dialog";
import { useCallback, useState } from "react";
import { FiSettings, FiTrash2 } from "react-icons/fi";
import { removeFeed, updateFeedTitle } from "../lib/fetcher";
import { mutate } from "swr";
import { Input, Label } from "./ui/input";
import { useDashboardContext } from "../hooks/useDashboard";

export const UpdateFeedForm = (props: { onClose(): void }) => {
  const [{ feed }, { unselectFeed }] = useDashboardContext();
  const [title, setTitle] = useState(feed?.title || "");
  const handleRemove = useCallback(() => {
    if (feed) {
      try {
        removeFeed(feed.id).then(() => {
          props.onClose();
          unselectFeed();
          mutate("feeds");
        });
      } catch (error) {}
    }
  }, [feed, props, unselectFeed]);

  const handleSubmit: React.FormEventHandler = useCallback(
    (event) => {
      if (event) {
        event.preventDefault();
      }

      if (feed) {
        updateFeedTitle(title, feed.id)
          .then((data) => {
            console.log(data);
            props.onClose();
            unselectFeed();
            mutate("feeds");
          })
          .catch((err) => console.log(err));
      }
    },
    [title, props]
  );

  return (
    <form onSubmit={handleSubmit}>
      <Label>
        <Input value={title} onChange={(event) => setTitle(event.target.value)} />
        <span>Feed Names</span>
      </Label>
      <div className="mt-8 flex justify-between">
        <div className="block text-red-500">
          <Button
            type="button"
            aria-label="Remove Feed"
            className="inline-flex items-center"
            onClick={handleRemove}>
            <FiTrash2 />
            <span className="ml-2">Unsubscribe</span>
          </Button>
        </div>

        <SuperButton type="submit" aria-label="Remove Feed">
          <span>Save</span>
        </SuperButton>
      </div>
    </form>
  );
};

export const FeedSettings = () => {
  const [isOpen, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  const [{ feed }] = useDashboardContext();

  return (
    <>
      <Button aria-label="Update feed" onClick={handleOpen}>
        <FiSettings />
      </Button>
      <Dialog isOpen={isOpen} onClose={handleClose} title={`Update feed "${feed?.title}"`}>
        <UpdateFeedForm onClose={handleClose} />
      </Dialog>
    </>
  );
};
