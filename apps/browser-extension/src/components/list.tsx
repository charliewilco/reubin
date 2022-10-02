import { h } from "preact";
import * as Icons from "./icons";

interface ListProps {
  data: RSSLink[];
}

export function List({ data }: ListProps) {
  return (
    <div className="overflow-hidden rounded-md bg-zinc-100 shadow dark:bg-zinc-800">
      <ul role="list" className="divide-y dark:divide-zinc-600">
        {data.map((feed) => (
          <li key={feed.href} className="cursor-pointer">
            <div className="block px-2 py-4 hover:bg-zinc-200 dark:hover:bg-zinc-500">
              <div className="flex items-center gap-2">
                <div className="flex flex-shrink-0 items-center">
                  <Icons.Feed
                    className="h-6 w-6 text-sky-500 dark:text-sky-600"
                    aria-hidden="true"
                  />
                </div>
                <div className="flex-1">
                  <div className="truncate">
                    <div>
                      <p className="truncate text-base font-bold text-sky-500 dark:text-sky-600">
                        {feed.title}
                      </p>
                      <p className="font-mono text-xs opacity-50">{feed.href}</p>
                    </div>
                    <div className="mt-2 flex"></div>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <Icons.ChevronRight className="h-5 w-5 text-zinc-400" aria-hidden="true" />
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
