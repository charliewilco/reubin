export const devQuery = () => {
  return new Promise<RSSLink[]>((resolve) => {
    resolve([
      {
        href: "https://charliewil.co/rss",
        title: "Charlie Wilco Feed",
        type: "Atom",
      },
      {
        href: "https://charliewil.co/rss",
        title: "Charlie Wilco Feed",
        type: "Atom",
      },
      {
        href: "https://charliewil.co/rss",
        title: "Charlie Wilco Feed",
        type: "Atom",
      },
    ]);
  });
};
