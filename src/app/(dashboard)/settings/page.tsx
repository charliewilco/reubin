import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Auth } from "$/lib/auth";
import { Controllers } from "$/lib/controllers";
import { CreateTagForm } from "$/components/create-tag";
import { TagRemovalList } from "$/components/tag-lists";

export const metadata: Metadata = {
	title: "Recommendations",
};
export default async function SettingsPage() {
	const authRequest = Auth.handleRequest({ cookies: cookies });
	const { user } = await authRequest.validateUser();

	const _ = await Controllers.tags.getAll(user.userId);

	return (
		<section className="w-full flex-1 p-4">
			<h1 className="text-3xl font-bold tracking-tight ">Settings</h1>
			<h2>Tags</h2>
			<div className="grid max-w-6xl grid-cols-12 gap-8">
				<div className="col-span-12 lg:col-span-6">
					<CreateTagForm />
				</div>
				<div className="col-span-12 lg:col-span-6">
					<h3 className="mb-8 text-2xl">Your Tags</h3>
					<TagRemovalList initialData={_} />
				</div>
			</div>
		</section>
	);
}
