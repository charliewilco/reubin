import { IFeed, ISubscription } from "./types";

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
