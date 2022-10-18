import Head from "next/head";
import { CreateTagForm } from "../components/create-tag";
import { TagRemovalList } from "../components/tag-lists";
import { AltHeader } from "../components/ui/alt-header";

function Settings() {
  return (
    <div className="mx-auto mt-6 max-w-7xl">
      <AltHeader />
      <Head>
        <title>Settings</title>
      </Head>
      <h1>Settings</h1>
      <section className="">
        <h2>Tags</h2>
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-6">
            <CreateTagForm />
          </div>
          <div className="col-span-6">
            <h3 className="mb-8 text-2xl">Your Tags</h3>
            <TagRemovalList />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Settings;
