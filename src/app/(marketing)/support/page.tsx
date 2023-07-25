import { SupportForm } from "$/components/promo/support-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Support",
};

export default async function SupportPage() {
	return (
		<div className="mx-auto mb-16 max-w-7xl space-y-16 p-2">
			<article className="mb-8 space-y-8">
				<header className="pb-8 pt-8">
					<h1 className="text-5xl font-bold tracking-tight">Get Some Help</h1>
				</header>

				<section className="grid grid-cols-12 gap-8">
					<aside className="col-span-4">
						<p>Hey there! </p>
						<p className="opacity-50">
							Got feedback or ideas? We&apos;re all ears! Zaptread thrives on your input, so we
							can keep making it better - together!
						</p>
					</aside>
					<div className="col-span-8">
						<SupportForm />
					</div>
				</section>
			</article>
		</div>
	);
}
