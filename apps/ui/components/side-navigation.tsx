import Link from "next/link";
import {
  MdHomeFilled,
  MdOutlineFeed,
  MdBookmarks,
  MdOutlineSettings,
  MdCoffee,
  MdCardGiftcard,
} from "react-icons/md";

interface LinkItemProps {
  href: string;
  name: string;
  children: React.ReactNode;
}

export const LinkItem = (props: LinkItemProps) => {
  return (
    <Link key={props.name} href={props.href}>
      <a className="flex items-center rounded-lg p-2 text-zinc-200 hover:bg-sky-700">
        {props.children}
        <span className="sr-only">{props.name}</span>
      </a>
    </Link>
  );
};

// unread / bookmarked / all / recommendations / appearance / settings

export const SideNavigation = () => {
  return (
    <nav aria-label="Sidebar" className="flex flex-col items-center space-y-4 px-2">
      <LinkItem href="/dashboard" name="Home">
        <MdHomeFilled className="h-6 w-6" aria-hidden="true" />
      </LinkItem>
      <LinkItem href="/dashboard/all" name="All">
        <MdOutlineFeed className="h-6 w-6" aria-hidden="true" />
      </LinkItem>
      <LinkItem href="/dashboard/bookmarks" name="Bookmarks">
        <MdBookmarks className="h-6 w-6" aria-hidden="true" />
      </LinkItem>
      <LinkItem href="/recommendations" name="Recommendations">
        <MdCardGiftcard className="h-6 w-6" aria-hidden="true" />
      </LinkItem>
      <LinkItem href="/coffee" name="Coffee">
        <MdCoffee className="h-6 w-6" aria-hidden="true" />
      </LinkItem>
      <LinkItem href="/settings" name="Settings">
        <MdOutlineSettings className="h-6 w-6" aria-hidden="true" />
      </LinkItem>
    </nav>
  );
};
