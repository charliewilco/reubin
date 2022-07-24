import { useFeedList } from "../hooks/useFeedList";
import { LoadingIndicator } from "./ui/activity-indicator";
import { classNames } from "./ui/class-names";

interface FeedItemProps {
	id: string;
	title: string;
	selected: null | string;
	onSelect(id: string): void;
}

export const FeedItem = (props: FeedItemProps) => {
	const handleSelect = () => {
		if (props.id) {
			props.onSelect(props.id);
		}
	};

	const isSelected = props.id === props.selected;

	return (
		<li key={props.id} className={classNames("p-2", isSelected && "bg-sky-600/50 text-white")}>
			<div>{props.title}</div>
			<button onClick={handleSelect}>Select</button>
		</li>
	);
};

interface FeedListProps {
	selected: null | string;
	onSelect(id: string): void;
}

export const FeedList = (props: FeedListProps) => {
	const { data, error, isLoading } = useFeedList();

	if (isLoading) {
		return <LoadingIndicator />;
	}

	if (error) {
		return <div>{error.toString()}</div>;
	}

	if (data) {
		if (data.feeds.length === 0) {
			return (
				<div>
					<p>Looks like you have no feeds.</p>
				</div>
			);
		}
		return (
			<div className="absolute top-0 left-0 right-0 bottom-0 w-full">
				<ul>
					{data.feeds.map((f) =>
						f === null ? null : (
							<FeedItem
								key={f?.id}
								id={f?.id}
								title={f?.title}
								onSelect={props.onSelect}
								selected={props.selected}
							/>
						)
					)}
				</ul>
			</div>
		);
	}

	return null;
};
