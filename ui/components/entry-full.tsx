import Head from "next/head";
import { useEffect } from "react";
import useSWR from "swr";
import { LoadingIndicator } from "./ui/activity-indicator";
import { getEntry, markAsRead } from "../lib/fetcher";

interface EntryFullProps {
  id: string;
}

export const EntryFull = (props: EntryFullProps) => {
  const { error, data, mutate } = useSWR(props.id, getEntry);

  const isLoading = !error && !data;

  useEffect(() => {
    async function mutator() {
      console.log("Running mutation");
      await markAsRead(props.id);

      mutate(
        async (data) => {
          if (data) {
            return {
              ...data,
              unread: false,
            };
          }
        },
        { rollbackOnError: true }
      );
    }
    if (data?.entry.unread) {
      mutator();
    }
  }, [data?.entry, mutate, props.id]);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <div>{error.toString()}</div>;
  }

  if (data) {
    return (
      <div className="absolute top-0 left-0 right-0 bottom-0 w-full ">
        <Head>
          <title>{data.entry?.title} | Reubin</title>
        </Head>
        <article className="px-8 pb-16">
          <header className="py-8">
            <h1 className="text-3xl font-bold">{data.entry?.title}</h1>
          </header>
          <section className="prose prose-invert">
            <div dangerouslySetInnerHTML={{ __html: data.entry?.content ?? "" }} />
          </section>
        </article>
      </div>
    );
  }

  return null;
};
