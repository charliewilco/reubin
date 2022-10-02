import { h } from "preact";
import { parseDocumentLinks } from "../lib/parse-document";
import { AvailableFeedList } from "./available-feed-list";

export function App() {
  return (
    <div
      id="Something Else"
      className="w-96 overflow-scroll bg-zinc-200 text-zinc-800 dark:bg-zinc-900 dark:text-zinc-100">
      <header className="flex justify-center border-b border-zinc-200 py-6 px-4 dark:border-zinc-700">
        <div className="">
          <svg className="inline-block h-[40px] w-[30px]">
            <use href="#icon-logo" />
          </svg>
        </div>
      </header>

      <div className="p-4">
        <AvailableFeedList onSearch={parseDocumentLinks} />
      </div>
    </div>
  );
}
