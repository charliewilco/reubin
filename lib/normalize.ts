import { IFeed, ISubscription } from "./types";
import qs from "query-string";
import { ENTRIES_URL } from "./urls";

export interface IServiceSubscriptions {
  id: number;
  created_at: string;
  feed_id: number;
  title: string;
  feed_url: string;
  site_url: string;
}

export interface IServiceTagging {
  id: number;
  feed_id: number;
  name: string;
}

export interface IEntryUnread {
  id: number;
  feed_id: number;
  title: string;
  author: any;
  summary: string;
  content: string;
  url: string;
  extracted_content_url: string;
  published: string;
  created_at: string;
}

function groupTags(taggings: IServiceTagging[]) {
  const m = new Map<string, [IServiceTagging]>();

  for (let index = 0; index < taggings.length; index++) {
    const element = taggings[index];

    const tag = m.get(element.name);

    if (tag) {
      tag.push(element);
    } else {
      m.set(element.name, [element]);
    }
  }

  return m;
}

export const deriveFeedFromSubscription = (s: IServiceSubscriptions): IFeed => {
  return {
    url: s.feed_url,
    site: s.site_url,
    id: s.id.toString(),
    unreadCount: Math.floor(Math.random() * Math.floor(1000)),
    name: s.title,
    items: [],
  };
};

export const normalizeSubscriptions = (
  subscriptions: IServiceSubscriptions[],
  taggings: IServiceTagging[]
): ISubscription => {
  const cloneSubscriptions = subscriptions.slice();

  const tags = Array.from(groupTags(taggings)).map(([title, feeds]) => {
    const results: IFeed[] = [];

    for (let i = 0; i < feeds.length; i++) {
      const { feed_id } = feeds[i];

      const j = cloneSubscriptions.findIndex((el) => el.feed_id === feed_id);

      if (j > -1) {
        const subscription = cloneSubscriptions.splice(j, 1)[0];
        results.push(deriveFeedFromSubscription(subscription));
      }
    }

    return {
      title,
      feeds: results,
    };
  });

  tags.push({
    title: "Untagged Feeds",
    feeds: cloneSubscriptions.map((i) => deriveFeedFromSubscription(i)),
  });

  return {
    tags,
  };
};

export const createUrlsofUnreads = (
  ids: number[],
  url = ENTRIES_URL
): string[] => {
  const urls: string[] = [];
  let count = Math.ceil(ids.length / 100);

  while (count > 0) {
    const q = ids.splice(0, 100);

    urls.push(
      qs.stringifyUrl({ url, query: { ids: q } } as any, {
        arrayFormat: "comma",
      })
    );
    count--;
  }

  return urls;
};
