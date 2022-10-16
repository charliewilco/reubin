import Link from "next/link";
import { useCallback } from "react";
import useSWR from "swr";

import { FiCornerDownLeft } from "react-icons/fi";
import { addFeed, getFeeds } from "../lib/graphql";
import { NEWS } from "../components/recommendation-list";
import dynamic from "next/dynamic";

const ClientRecommendationList = dynamic(
  async () => {
    const mod = await import("../components/recommendation-list");
    return mod.RecommendationList;
  },
  {
    ssr: false,
  }
);

function RecommendationsPage() {
  const { data, error, mutate } = useSWR("recommended feeds", getFeeds, {
    fallbackData: undefined,
  });

  const handleClick = useCallback(
    async (link: string) => {
      const data = await addFeed(link);

      await mutate((prevData) => {
        prevData?.feeds.push(data.addFeed);

        return prevData;
      });
    },
    [mutate]
  );

  return (
    <div className="mx-auto max-w-7xl space-y-16 pt-16">
      <div>
        <Link href="/dashboard">
          <a className="flex items-center gap-4">
            <FiCornerDownLeft />

            <span>Dashboard</span>
          </a>
        </Link>
      </div>
      <div className="space-y-8 pb-8">
        {error && <div>{error.toString()}</div>}

        <ClientRecommendationList
          title="News"
          feeds={NEWS}
          data={data}
          error={error}
          onClick={handleClick}
        />
      </div>
    </div>
  );
}

export default RecommendationsPage;
