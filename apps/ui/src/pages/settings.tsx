import useSWR from "swr";
import { CreateTagForm } from "../components/create-tag";
import { TagDeletionList } from "../components/tag-lists";
import { getAllTags } from "../lib/graphql";
import { AltHeader } from "../components/ui/alt-header";

function Settings() {
  const { data, mutate } = useSWR("all-tags", getAllTags);

  return (
    <div className="mx-auto mt-6 max-w-7xl">
      <AltHeader />
      <h1>Settings</h1>
      <section className="">
        <h2>Tags</h2>
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-6">
            <CreateTagForm
              onSubmit={() => {
                mutate();
              }}
            />
          </div>
          <div className="col-span-6">
            <h3 className="mb-8 text-2xl">Your Tags</h3>
            {data?.tags && <TagDeletionList tags={data.tags} onDelete={(_tag) => mutate()} />}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Settings;
