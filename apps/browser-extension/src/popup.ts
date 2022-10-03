import { h, render } from "preact";
import { useEffect, useState } from "preact/hooks";
import { parseDocumentLinks } from "./parse-document";

function IconFeed(props: any) {
  return h(
    "svg",
    Object.assign(
      {
        stroke: "currentColor",
        fill: "currentColor",
        strokeWidth: 0,
        viewBox: "0 0 24 24",
        xmlns: "http://www.w3.org/2000/svg",
      },
      props
    ),
    h("use", { href: "#icon-feed" })
  );
}

function IconChevronRight(props: any) {
  return h(
    "svg",
    Object.assign(
      {
        width: 24,
        height: 24,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: 2,
        strokeLinecap: "round",
        strokeLinejoin: "round",
      },
      props
    ),
    h("use", { href: "#icon-chevron-right" })
  );
}

interface AppState {
  hasChecked: boolean;
  availableFeeds: RSSLink[];
}

function AvailableFeedList() {
  let content = null;
  const [state, setState] = useState<AppState>({ hasChecked: false, availableFeeds: [] });

  useEffect(() => {
    if (!state.hasChecked) {
      parseDocumentLinks().then((links) => {
        setState({
          hasChecked: true,
          availableFeeds: links ?? [],
        });
      });
    }
  }, []);

  if (!state.hasChecked) {
    content = h(
      "div",
      { className: "h-8 w-8 text-sky-500", role: "alert", "aria-busy": "true" },
      h(
        "svg",
        { height: "100%", viewBox: "0 0 32 32", width: "100%", className: "animate-spin" },
        h("circle", {
          cx: "16",
          cy: "16",
          fill: "none",
          r: "14",
          "stroke-width": "4",
          stroke: "currentColor",
          opacity: 0.2,
        }),
        h("circle", {
          cx: "16",
          cy: "16",
          fill: "none",
          r: "14",
          "stroke-width": "4",
          stroke: "currentColor",
          "stroke-dashoffset": 60,
          "stroke-dasharray": 80,
        })
      )
    );
  } else if (state.availableFeeds.length === 0) {
    content = h("p", {}, [
      h("span", { className: "opacity-50" }, "No feeds found. "),
      h(
        "a",
        { className: "text-sky-500 dark:text-sky-600", href: "https://reubin.app" },
        "Learn more here."
      ),
    ]);
  } else {
    content = h(
      "div",
      { className: "overflow-hidden rounded-md bg-zinc-100 shadow dark:bg-zinc-800" },
      h(
        "ul",
        { role: "list", className: "divide-y dark:divide-zinc-600" },
        state.availableFeeds.map((feed) =>
          h(
            "li",
            { key: feed.href, className: "cursor-pointer" },
            h(
              "div",
              { className: "block px-2 py-4 hover:bg-zinc-200 dark:hover:bg-zinc-500" },
              h(
                "div",
                { className: "flex items-center gap-2" },
                h(
                  "div",
                  { className: "flex flex-shrink-0 items-center" },
                  h(IconFeed, {
                    className: "h-6 w-6 text-sky-500 dark:text-sky-600",
                    "aria-hidden": "true",
                  })
                ),
                h(
                  "div",
                  { className: "flex-1" },
                  h(
                    "div",
                    { className: "truncate" },
                    h(
                      "div",
                      null,
                      h(
                        "p",
                        {
                          className:
                            "truncate text-base font-bold text-sky-500 dark:text-sky-600",
                        },
                        feed.title
                      ),
                      h("p", { className: "font-mono text-xs opacity-50" }, feed.href)
                    ),
                    h("div", { className: "mt-2 flex" })
                  )
                ),
                h(
                  "div",
                  { className: "flex-shrink-0" },
                  h(IconChevronRight, {
                    className: "h-5 w-5 text-zinc-400",
                    "aria-hidden": "true",
                  })
                )
              )
            )
          )
        )
      )
    );
  }

  return h("div", {}, [
    h("h2", { className: "mb-4 flex-1 text-xl font-semibold" }, "Available Feeds"),
    content,
  ]);
}

const root = document.getElementById("app");

if (root !== null) {
  render(h(AvailableFeedList, {}), root);
}
