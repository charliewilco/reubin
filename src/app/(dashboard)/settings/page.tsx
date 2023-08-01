import type { Metadata } from "next";
import { CreateTagForm } from "$/components/tag-create-form";
import { TagRemovalList } from "$/components/tag-removal-list";

export const metadata: Metadata = {
	title: "Settings",
};

export default async function SettingsPage() {
	return (
		<div className="w-full flex-1 p-4">
			<div className="mx-auto max-w-7xl space-y-16">
				<header className="border-b py-8">
					<h1 className="mb-4 text-3xl font-bold tracking-tight">Settings</h1>
					<p className="opacity-50">Update tags, account settings and other non-sense.</p>
				</header>
				<section className="grid grid-cols-12 gap-8">
					<header className="col-span-12 lg:col-span-3 ">
						<h2 className="text-xl ">Tags</h2>
						<p className="opacity-50">
							Tags group feeds into common spaces. You can think of these like folders
						</p>
					</header>

					<div className="col-span-12 lg:col-span-5">
						<CreateTagForm />
					</div>
					<div className="col-span-12 lg:col-span-4">
						<h3 className="mb-8 text-2xl">Available Tags</h3>
						<TagRemovalList />
					</div>
				</section>
				<section className="grid grid-cols-12 gap-8">
					<header className="col-span-12 lg:col-span-3">
						<h2 className="text-xl ">Some Other Preference</h2>
						<p className="opacity-50">This is some other thing to mark as able to change.</p>
					</header>
				</section>
			</div>
		</div>
	);
}
