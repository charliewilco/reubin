import { useCallback } from "react";
import useSWR from "swr";
import { CreateTagForm } from "../components/create-tag";
import { TagDeletionList } from "../components/ui/tag-lists";
import { getAllTags, addTag } from "../lib/graphql";

function Settings() {
  const { data, mutate } = useSWR("tags", getAllTags);
  const handleSubmitTag = useCallback(
    async (tagName: string) => {
      await addTag(tagName);
      mutate();
    },
    [mutate]
  );

  return (
    <div className="mx-auto mt-6 max-w-6xl">
      <h1>Settings</h1>
      <section className="">
        <h2>Tags</h2>
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-6">
            <CreateTagForm onSubmit={handleSubmitTag} />
          </div>
          <div className="col-span-6">
            <h3 className="mb-8 text-2xl">Your Tags</h3>
            {data?.tags && <TagDeletionList tags={data.tags} onDelete={() => {}} />}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Settings;
