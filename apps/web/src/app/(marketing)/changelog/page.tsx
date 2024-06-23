import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Changelog",
};

export default function ChangelogPage() {
	return (
		<div className="mx-auto mb-16 max-w-7xl space-y-16 p-2">
			<header className="pt-8">
				<h1 className="text-5xl font-bold tracking-tight">Changelog</h1>
			</header>
		</div>
	);
}
