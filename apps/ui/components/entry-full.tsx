import Head from "next/head";
import { useEntry } from "../hooks/useEntry";
import { LoadingIndicator } from "./ui/activity-indicator";

interface EntryFullProps {
	id: string;
}

export const EntryFull = (props: EntryFullProps) => {
	const { data, error, isLoading } = useEntry(props.id);

	if (isLoading) {
		return <LoadingIndicator />;
	}

	if (error) {
		return <div>{error.toString()}</div>;
	}

	if (data) {
		return (
			<div className="absolute top-0 left-0 right-0 bottom-0 w-full ">
				<Head>
					<title>{data.entry?.title} | Reubin</title>
				</Head>
				<article className="px-8 pb-16">
					<header className="py-8">
						<h1 className="text-3xl font-bold">{data.entry?.title}</h1>
					</header>
					<section className="prose prose-invert">
						<div dangerouslySetInnerHTML={{ __html: data.entry?.content ?? "" }} />
					</section>
				</article>
			</div>
		);
	}

	return null;
};
