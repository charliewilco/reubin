import { GraphQLClient } from "graphql-request";
import { NextPage, GetStaticProps, InferGetStaticPropsType } from "next";
import useSWR, { SWRResponse } from "swr";
import base64 from "base-64";

import {
  LocalRssDocument,
  ILocalRssQuery,
  ILocalRssQueryVariables,
} from "../util/reubin-sdk";
import { useState } from "react";
import { InboxList } from "../components/inbox-list";
import { InboxAppHeader } from "../components/inbox-app-header";
import { InboxContent } from "../components/inbox-content";
import { InboxSidebar } from "../components/inbox-sidebar";
import { InboxAppLayout } from "../components/inbox-app-ui";

interface IPlaygroundProps {
  subscriptions: string[];
}

const SUBSCRIPTIONS = [
  "https://daverupert.com/atom.xml",
  "https://charliewil.co/rss.xml",
  "https://typescript.wtf/rss.xml",
];

export const getStaticProps: GetStaticProps<IPlaygroundProps> = async () => {
  const encoded = SUBSCRIPTIONS.map(base64.encode);

  console.log(encoded);

  return {
    props: {
      subscriptions: SUBSCRIPTIONS,
    },
  };
};

const client = new GraphQLClient("/api/graphql");

const fetcher = (url: string) =>
  client.request<ILocalRssQuery, ILocalRssQueryVariables>(LocalRssDocument, {
    url,
  });

const renderContent = ({ data, error }: SWRResponse<ILocalRssQuery, any>) => {
  if (error) {
    return <div>{error.message}</div>;
  }

  if (!data) {
    return <h1>Loading</h1>;
  }

  return (
    <>
      <InboxContent>
        <h1>Hello</h1>
      </InboxContent>
      <InboxList data={data} />
    </>
  );
};

const PlaygroundPage: NextPage<
  InferGetStaticPropsType<typeof getStaticProps>
> = (props) => {
  const [currentSubscription] = useState(props.subscriptions[0]);
  const response = useSWR(currentSubscription, fetcher);

  return (
    <InboxAppLayout header={<InboxAppHeader />} sidebar={<InboxSidebar />}>
      {renderContent(response)}
    </InboxAppLayout>
  );
};

export default PlaygroundPage;
