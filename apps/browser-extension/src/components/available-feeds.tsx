import { FeedList } from "./feed-list";
import { AppWrapper } from "./wrapper";
import { LoadingSpinner } from "./loading";
import { Empty } from "./empty-state";
import { useAsyncResult } from "./useResult";

interface AvailableFeedProps {
	id: string;
	onParse(): Promise<RSSLink[]>;
}

interface State {
	hasChecked: boolean;
	availableFeeds: RSSLink[];
}

export const initialState: State = {
	hasChecked: false,
	availableFeeds: [],
};

export function AvailableFeedList({ id, onParse }: AvailableFeedProps) {
	const { hasFired, data, error, retry } = useAsyncResult(id, onParse);

	let content = null;

	if (!hasFired) {
		content = <LoadingSpinner />;
	} else if (data && data?.length === 0) {
		content = <Empty />;
	} else if (data) {
		content = <FeedList links={data} />;
	}

	return <AppWrapper onRetry={retry}>{content}</AppWrapper>;
}
