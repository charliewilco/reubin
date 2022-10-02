import { AvailableFeedList } from "./available-feed-list";
import { Logo } from "./logo";

export function App() {
  return (
    <div
      id="Something Else"
      className="min-h-[36rem] w-96 dark:bg-zinc-900 dark:text-zinc-100">
      <header className="flex justify-center p-4">
        <Logo />
      </header>

      <div className="p-4">
        <AvailableFeedList />
      </div>
    </div>
  );
}
