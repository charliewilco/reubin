import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useFormik } from "formik";
import { addFeed } from "../lib/fetcher";
import { SuperButton, Button, IconButton } from "./ui/button";
import { Label, Fieldset, Input } from "./ui/input";

interface AddFeedFormProps {
  onSubmit(url: string): void | Promise<void>;
  onSelect?(selectedFeed: unknown): void | Promise<void>;
}

export const AddFeedForm = (props: AddFeedFormProps) => {
  const formik = useFormik({
    initialValues: {
      url: "",
    },
    onSubmit(values) {
      props.onSubmit(values.url);
    },
  });
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Fieldset>
          <Label htmlFor="name">URL</Label>
          <Input {...formik.getFieldProps("url")} />
        </Fieldset>
        <div style={{ display: "flex", marginTop: 25, justifyContent: "flex-end" }}>
          <SuperButton type="submit">Submit</SuperButton>
        </div>
      </form>
    </div>
  );
};

export const AddFeed = () => {
  return (
    <DialogPrimitive.Root>
      <DialogPrimitive.Trigger asChild>
        <Button>Add Feed</Button>
      </DialogPrimitive.Trigger>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 bg-zinc-900 opacity-50" />
        <DialogPrimitive.Content className="fixed top-1/2 left-1/2 max-h-[85vh] w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-sm bg-zinc-900 p-4 shadow-lg">
          <DialogPrimitive.Title className="text-xl font-semibold">
            Add Feed
          </DialogPrimitive.Title>
          <DialogPrimitive.Description className="mt-2 mb-8 text-sm opacity-50">
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogPrimitive.Description>
          <AddFeedForm onSubmit={addFeed} />
          <DialogPrimitive.Close asChild>
            <IconButton aria-label="Close">
              <Cross2Icon />
            </IconButton>
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};
