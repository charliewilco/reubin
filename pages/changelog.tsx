import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import Head from "next/head";
import { ChangelogPost } from "../components/changelog-post";
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
    <MarketingLayout title="Changelog">
      <Head>
        <title>Changelog | Reubin</title>
      </Head>
      <div className="relative py-8">
        <p className="text-xl text-gray-500">Release notes</p>
        <div className="mt-6 grid gap-16 border-t-2 border-gray-100 pt-10 md:grid-cols-2 md:gap-x-5 md:gap-y-12 mb-32">
          {props.results.repository?.releases.nodes?.map((n, i) => {
            return (
              <ChangelogPost
                key={i}
                publishDate={n?.publishedAt}
                title={n?.name!}
                content={n?.descriptionHTML!}
              />
            );
          })}
        </div>
      </div>
    </MarketingLayout>
  );
};

export default Changelog;
