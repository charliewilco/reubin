import { getDateString } from "$/utils/dates";

interface SingleEntryHeaderProps {
	title: string;
	date: Date;
}

export function SingleEntryHeader(props: SingleEntryHeaderProps) {
	let date = getDateString(props.date);
	return (
		<header className="py-8">
			<h1 className="mb-2 text-3xl font-bold">{props.title}</h1>
			<p className="font-mono text-sm opacity-50">{date}</p>
		</header>
	);
}
