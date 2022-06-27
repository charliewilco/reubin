import useSWR from "swr";
import { sdk } from "../lib/fetcher";

interface EntryListProps {
  feedID: string;
}

export const EntryList = (props: EntryListProps) => {
  const { data } = useSWR(props.feedID, (id) => sdk.EntriesByFeed({ id }));
  return (
    <div>
      <ul>
        {data?.entries.map((entry) => {
          return (
            <li key={entry?.id} className="border-b border-zinc-700 p-2">
              <h3 className="mb-2 text-lg font-bold">{entry?.title}</h3>
              <p className="font-mono text-sm opacity-50">{entry?.id}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
