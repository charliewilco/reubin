import { useFeedList } from "../hooks/useFeedList";
import { LoadingIndicator } from "./ui/activity-indicator";

interface FeedListProps {
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
      <div className="absolute top-0 left-0 right-0 bottom-0 w-full ">
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
