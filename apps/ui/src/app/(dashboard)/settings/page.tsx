import { CreateTagForm } from "../../../components/create-tag";
import { TagRemovalList } from "../../../components/tag-lists";

export default function SettingsPage() {
  return (
    <section className="px-2">
      <h1>Settings</h1>

      <h2>Tags</h2>
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-6">
          <CreateTagForm />
        </div>
        <div className="col-span-12 lg:col-span-6">
          <h3 className="mb-8 text-2xl">Your Tags</h3>
          <TagRemovalList />
        </div>
      </div>
    </section>
  );
}
