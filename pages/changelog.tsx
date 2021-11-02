import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { MarketingLayout } from "../components/layout";

import { IChangelogsQuery } from "../util/github-sdk";
import { sdk } from "../util/sdk";

export const getStaticProps: GetStaticProps<{
  results: IChangelogsQuery;
}> = async () => {
  const results = await sdk.Changelogs();

  return {
    props: {
      results,
    },
  };
};

const Changelog: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = (
  props
) => {
  return (
    <MarketingLayout title="Changelog" addressbar="Changelog | Reubin">
      <div className="relative py-8">
        <p className="text-xl text-gray-500">Release notes</p>
        <div className="mt-6 grid gap-16 border-t-2 border-gray-100 pt-10 md:grid-cols-2 md:gap-x-5 md:gap-y-12 mb-32">
          {props.results.repository?.releases.nodes?.map((n, i) => {
            const d = new Date(n?.publishedAt).toLocaleString("en", {
              year: "numeric",
              month: "long",
              day: "numeric",
            });
            return (
              <div className=" bg-white dark:bg-gray-800 p-4 shadow-md" key={i}>
                <p className="text-sm leading-5 text-gray-600 dark:text-gray-500 uppercase tracking-widest font-mono">
                  <time dateTime={n?.publishedAt}>{d}</time>
                </p>
                <h3 className="mt-2 text-xl leading-7 font-semibold  dark:text-gray-100">
                  {n?.name}
                </h3>
                <div
                  className="mt-3 text-base leading-6 prose"
                  dangerouslySetInnerHTML={{ __html: n?.descriptionHTML }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </MarketingLayout>
  );
};

export default Changelog;
