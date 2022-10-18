import { useCallback } from "react";
import useSWR from "swr";

import { addFeed, getFeeds } from "../lib/graphql";
import { NEWS, TECH, RecommendationList } from "../components/recommendation-list";
import { AltHeader } from "../components/ui/alt-header";

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
    <div className="mx-auto max-w-7xl space-y-16">
      <AltHeader />
      <div className="space-y-8 px-2 pb-8">
        {error && <div>{error.toString()}</div>}

        <RecommendationList
          title="News"
          feeds={NEWS}
          data={data}
          error={error}
          onClick={handleClick}
        />

        <RecommendationList
          title="Tech"
          feeds={TECH}
          data={data}
          error={error}
          onClick={handleClick}
        />
      </div>
    </div>
  );
}

export default RecommendationsPage;
