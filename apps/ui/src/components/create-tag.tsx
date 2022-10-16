import { useCallback, useState } from "react";
import { addTag } from "../lib/graphql";
import { SuperButton } from "./ui/button";
import { Label, Input, TextLabel } from "./ui/input";

interface CreateTagFormProps {
  onSubmit(tag: string): void | Promise<void>;
}

export const CreateTagForm = () => {
  const handleSubmitTag = useCallback(async (tagName: string) => {
    await addTag(tagName);
  }, []);

  return <CreateTag onSubmit={handleSubmitTag} />;
};

export const CreateTag = (props: CreateTagFormProps) => {
  const [tagName, setTagName] = useState("");
  const handleSubmit: React.FormEventHandler = useCallback(
    (event) => {
      if (event) {
        event.preventDefault();
      }

      if (tagName === "") {
        return;
      }

      props.onSubmit(tagName);
      setTagName("");
    },
    [tagName, props]
  );

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      setTagName(event.target.value);
    },
    [setTagName]
  );

  return (
    <div className="p-2">
      <form onSubmit={handleSubmit}>
        <Label htmlFor="tag">
          <Input
            name="tag"
            id="tag"
            data-testid="add-tag-input"
            value={tagName}
            onChange={handleChange}
          />
          <TextLabel>New Tag</TextLabel>
        </Label>

        <div className="mt-8 flex justify-end">
          <SuperButton type="submit">Submit</SuperButton>
        </div>
      </form>
    </div>
  );
};
