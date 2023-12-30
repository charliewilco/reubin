import { SingleEntryHeader } from "./header";
import { MarkAsRead } from "./mark-as-read";

interface SingleEntryWrapperProps {
	id: string;
	title: string;
	date: Date;
	children?: React.ReactNode;
}

export function SingleEntryWrapper(props: SingleEntryWrapperProps) {
	return (
		<div className="absolute bottom-0 left-0 right-0 top-0 w-full ">
			<MarkAsRead id={props.id} />
			<article className="mx-auto max-w-2xl px-8 pb-16">
				<SingleEntryHeader title={props.title} date={props.date} />
				{props.children}
			</article>
		</div>
	);
}
