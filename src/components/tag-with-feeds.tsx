import { AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";

interface TagWithFeedsProps {
	title: string;
	children?: React.ReactNode;
}

export function TagWithFeeds(props: TagWithFeedsProps) {
	return (
		<AccordionItem value="item-1">
			<AccordionTrigger>{props.title}</AccordionTrigger>
			<AccordionContent>{props.children}</AccordionContent>
		</AccordionItem>
	);
}
