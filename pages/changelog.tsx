import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { MarketingLayout } from "../components/layout";
import { ReleaseNotes } from "../components/release-notes";

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
      <ReleaseNotes results={props.results} />
    </MarketingLayout>
  );
};

export default Changelog;
