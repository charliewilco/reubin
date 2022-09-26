import { useCallback, useState } from "react";
import { addFeed } from "../lib/fetcher";
import { SuperButton, Button } from "./ui/button";
import { Label, Input, TextLabel } from "./ui/input";
import { Dialog } from "./ui/dialog";
import { FiPlus } from "react-icons/fi";

interface AddFeedFormProps {
  onSubmit(url: string): void | Promise<void>;
  onSelect?(selectedFeed: unknown): void | Promise<void>;
}

export const AddFeedForm = (props: AddFeedFormProps) => {
  const [url, setUrl] = useState("");

  const handleSubmit: React.FormEventHandler = useCallback(
    (event) => {
      if (event) {
        event.preventDefault();
      }

      props.onSubmit(url);
    },
    [url, props]
  );

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Label htmlFor="name">
          <Input value={url} onChange={(event) => setUrl(event.target.value)} />
          <TextLabel>URL</TextLabel>
        </Label>

        <div className="mt-8 flex justify-end">
          <SuperButton type="submit">Submit</SuperButton>
        </div>
      </form>
    </div>
  );
};

export const AddFeed = () => {
  const [isOpen, setOpen] = useState(false);
  const handleSubmit = useCallback((url: string) => {
    addFeed(url);
  }, []);

  return (
    <>
      <Button onClick={() => setOpen(true)} aria-label="Add Feed" className="block">
        <FiPlus size={24} />
      </Button>
      <Dialog isOpen={isOpen} onClose={() => setOpen(false)} title="Add Feed">
        <div className="mt-2 mb-8 text-sm opacity-50">
          Make changes to your profile here. Click save when you&apos;re done.
        </div>
        <AddFeedForm onSubmit={handleSubmit} />
      </Dialog>
    </>
  );
};
