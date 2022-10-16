import type { GetFeedsQuery } from "../lib/__generated__";
import { RecommendationCard } from "./ui/recommendation-card";

export type RecommendedField = { link: string; displayName: string };

interface RecommendationListItemProps {
  feeds: RecommendedField[];
  title: string;
  data?: GetFeedsQuery;
  error?: any;
  onClick: (link: string) => void;
}

export const NEWS = [
  {
    link: "https://www.vox.com/rss/index.xml",
    displayName: "Vox",
  },
  {
    link: "https://www.out.com/rss.xml",
    displayName: "Out.com",
  },
  {
    link: "https://www.buzzfeed.com/world.xml",
    displayName: "BuzzFeed World News",
  },
  {
    link: "https://nautil.us/rss/all",
    displayName: "Nautilus",
  },
  {
    link: "https://thedailywhat.cheezburger.com/rss",
    displayName: "Daily What",
  },
];

export function RecommendationList(props: RecommendationListItemProps) {
  return (
    <section>
      <h2 className="text-lg opacity-50">{props.title}</h2>

      <ul role="list" className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {props.feeds.map((r) => (
          <li key={r.displayName} className="col-span-1">
            <RecommendationCard
              displayName={r.displayName}
              link={r.link}
              feeds={props.data}
              error={props.error}
              onSubscribe={props.onClick}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
