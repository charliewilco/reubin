import useSWR from "swr";
import { sdk } from "../lib/fetcher";
import { LoadingIndicator } from "./activity-indicator";

interface FeedListProps {
  onSelect(id: string): void;
}

export const FeedList = (props: FeedListProps) => {
  const { data, error } = useSWR("feeds", () => sdk.GetFeeds());

  const isLoading = !error && !data;

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
      <div>
        <ul>
          {data.feeds.map((f) => {
            return (
              <li key={f?.id} className="p-2">
                <div>{f?.title}</div>
                <button
                  onClick={() => {
                    if (f?.id) {
                      props.onSelect(f.id);
                    }
                  }}>
                  Select
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  return null;
};
