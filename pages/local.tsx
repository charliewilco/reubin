import { GraphQLClient } from "graphql-request";
import { NextPage, GetStaticProps, InferGetStaticPropsType } from "next";
import useSWR from "swr";
import base64 from "base-64";
import {
  FiChevronDown,
  FiMenu,
  FiSearch,
  FiBell,
  FiInbox,
  FiArchive,
  FiUser,
  FiFlag,
  FiSlash,
  FiEdit2,
  FiX,
} from "react-icons/fi";
import format from "date-fns/format";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import {
  IItem,
  LocalRssDocument,
  ILocalRssQuery,
  ILocalRssQueryVariables,
} from "../util/reubin-sdk";
import { useState } from "react";

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

const renderItem = (v: Pick<IItem, "title" | "url" | "published">) => {
  const d = new Date(v.published);
  const date = formatDistanceToNow(d, {
    addSuffix: true,
  });

  const formatedDate = format(d, "dd LLL yyyy");
  return (
    <li key={v.url} className="dark:text-white">
      <a href="#" className="block hover:bg-gray-50">
        <div className="px-4 py-4">
          <div>
            <p className="text-base font-medium ">{v.title}</p>
          </div>
          <time dateTime="2020-01-07" className="text-sm">
            {date} &bull; {formatedDate}
          </time>
        </div>
      </a>
    </li>
  );
};

const PlaygroundPage: NextPage<
  InferGetStaticPropsType<typeof getStaticProps>
> = (props) => {
  const [currentSubscription] = useState(props.subscriptions[0]);
  const { data, error } = useSWR(currentSubscription, fetcher);

  if (error) {
    return <div>{error.message}</div>;
  }

  if (!data) {
    return <h1>Loading</h1>;
  }

  return (
    <div className="h-screen overflow-hidden flex flex-col">
      {/* Top nav*/}
      <header className="flex-shrink-0 relative h-16 bg-white flex items-center">
        {/* Logo area */}
        <div className="absolute inset-y-0 left-0 md:static md:flex-shrink-0">
          <a
            href="#"
            className="flex items-center justify-center h-16 w-16 bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600 md:w-20"
          >
            <img
              className="h-8 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark.svg?color=white"
              alt="Workflow"
            />
          </a>
        </div>
        {/* Picker area */}
        <div className="mx-auto md:hidden">
          <div className="relative">
            <label htmlFor="inbox-select" className="sr-only">
              Choose inbox
            </label>
            <select
              id="inbox-select"
              className="rounded-md border-0 bg-none pl-3 pr-8 text-base font-medium text-gray-900 focus:ring-2 focus:ring-indigo-600"
            >
              <option>Open</option>
              <option>Archive</option>
              <option>Customers</option>
              <option>Flagged</option>
              <option>Spam</option>
              <option>Drafts</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center justify-center pr-2">
              <FiChevronDown className="h-5 w-5 text-gray-500" />
            </div>
          </div>
        </div>
        {/* Menu button area */}
        <div className="absolute inset-y-0 right-0 pr-4 flex items-center sm:pr-6 md:hidden">
          {/* Mobile menu button */}
          <button
            type="button"
            className="-mr-2 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <FiMenu className="block h-6 w-6" />
          </button>
        </div>
        {/* Desktop nav area */}
        <div className="hidden md:min-w-0 md:flex-1 md:flex md:items-center md:justify-between">
          <div className="min-w-0 flex-1">
            <div className="max-w-2xl relative text-gray-400 focus-within:text-gray-500">
              <label htmlFor="search" className="sr-only">
                Search
              </label>
              <input
                id="search"
                type="search"
                placeholder="Search"
                className="block w-full border-transparent pl-12 placeholder-gray-500 focus:border-transparent sm:text-sm focus:ring-0"
              />
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-4">
                <FiSearch className="h-5 w-5" />
              </div>
            </div>
          </div>
          <div className="ml-10 pr-4 flex-shrink-0 flex items-center space-x-10">
            <nav aria-label="Global" className="flex space-x-10">
              <a href="#" className="text-sm font-medium text-gray-900">
                Inboxes
              </a>
              <a href="#" className="text-sm font-medium text-gray-900">
                Reporting
              </a>
              <a href="#" className="text-sm font-medium text-gray-900">
                Settings
              </a>
            </nav>
            <div className="flex items-center space-x-8">
              <span className="inline-flex">
                <a
                  href="#"
                  className="-mx-1 bg-white p-1 rounded-full text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">View notifications</span>

                  <FiBell className="h-6 w-6" />
                </a>
              </span>
              <div className="relative inline-block text-left">
                <button
                  type="button"
                  className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
                  id="menu-1"
                  aria-expanded="false"
                  aria-haspopup="true"
                >
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="h-8 w-8 rounded-full"
                    src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  />
                </button>
                {/*
        Dropdown menu, show/hide based on menu state.

        Entering: "transition ease-out duration-100"
          From: "transform opacity-0 scale-95"
          To: "transform opacity-100 scale-100"
        Leaving: "transition ease-in duration-75"
          From: "transform opacity-100 scale-100"
          To: "transform opacity-0 scale-95"
      */}
                <div
                  className="origin-top-right absolute z-30 right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="menu-1"
                >
                  <div className="py-1" role="none">
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Your Profile
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Sign Out
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Mobile menu, show/hide this `div` based on menu open/closed state */}
        <div className="fixed inset-0 z-40 md:hidden">
          {/*
  Off-canvas menu overlay, show/hide based on off-canvas menu state.

  Entering: "transition-opacity ease-linear duration-300"
    From: "opacity-0"
    To: "opacity-100"
  Leaving: "transition-opacity ease-linear duration-300"
    From: "opacity-100"
    To: "opacity-0"
*/}
          <div
            className="hidden sm:block sm:fixed sm:inset-0 md:hidden"
            aria-hidden="true"
          >
            <div className="absolute inset-0 bg-gray-600 opacity-75" />
          </div>
          {/*
  Mobile menu, toggle classes based on menu state.

  Entering: "transition ease-out duration-150 sm:ease-in-out sm:duration-300"
    From: "transform opacity-0 scale-110 sm:translate-x-full sm:scale-100 sm:opacity-100"
    To: "transform opacity-100 scale-100  sm:translate-x-0 sm:scale-100 sm:opacity-100"
  Leaving: "transition ease-in duration-150 sm:ease-in-out sm:duration-300"
    From: "transform opacity-100 scale-100 sm:translate-x-0 sm:scale-100 sm:opacity-100"
    To: "transform opacity-0 scale-110  sm:translate-x-full sm:scale-100 sm:opacity-100"
*/}
          <nav
            className="fixed z-40 inset-0 h-full w-full bg-white sm:inset-y-0 sm:left-auto sm:right-0 sm:max-w-sm sm:w-full sm:shadow-lg md:hidden"
            aria-label="Global"
          >
            <div className="h-16 flex items-center justify-between px-4 sm:px-6">
              <a href="#">
                <img
                  className="block h-8 w-auto"
                  src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=500"
                  alt="Workflow"
                />
              </a>
              <button
                type="button"
                className="-mr-2 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {/* Heroicon name: outline/x */}
                <FiX className="block h-6 w-6" />
              </button>
            </div>
            <div className="mt-2 max-w-8xl mx-auto px-4 sm:px-6">
              <div className="relative text-gray-400 focus-within:text-gray-500">
                <label htmlFor="search" className="sr-only">
                  Search all inboxes
                </label>
                <input
                  id="search"
                  type="search"
                  placeholder="Search all inboxes"
                  className="block w-full border-gray-300 rounded-md pl-10 placeholder-gray-500 focus:border-indigo-600 focus:ring-indigo-600"
                />
                <div className="absolute inset-y-0 left-0 flex items-center justify-center pl-3">
                  {/* Heroicon name: solid/search */}
                  <FiSearch className="h-5 w-5" />
                </div>
              </div>
            </div>
            <div className="max-w-8xl mx-auto py-3 px-2 sm:px-4">
              <a
                href="#"
                className="block rounded-md py-2 px-3 text-base font-medium text-gray-900 hover:bg-gray-100"
              >
                Inboxes
              </a>
              <a
                href="#"
                className="block rounded-md py-2 pl-5 pr-3 text-base font-medium text-gray-500 hover:bg-gray-100"
              >
                Technical Support
              </a>
              <a
                href="#"
                className="block rounded-md py-2 pl-5 pr-3 text-base font-medium text-gray-500 hover:bg-gray-100"
              >
                Sales
              </a>
              <a
                href="#"
                className="block rounded-md py-2 pl-5 pr-3 text-base font-medium text-gray-500 hover:bg-gray-100"
              >
                General
              </a>
              <a
                href="#"
                className="block rounded-md py-2 px-3 text-base font-medium text-gray-900 hover:bg-gray-100"
              >
                Reporting
              </a>
              <a
                href="#"
                className="block rounded-md py-2 px-3 text-base font-medium text-gray-900 hover:bg-gray-100"
              >
                Settings
              </a>
            </div>
            <div className="border-t border-gray-200 pt-4 pb-3">
              <div className="max-w-8xl mx-auto px-4 flex items-center sm:px-6">
                <div className="flex-shrink-0">
                  <img
                    className="h-10 w-10 rounded-full"
                    src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt="Nothing"
                  />
                </div>
                <div className="ml-3 min-w-0 flex-1">
                  <div className="text-base font-medium text-gray-800 truncate">
                    Whitney Francis
                  </div>
                  <div className="text-sm font-medium text-gray-500 truncate">
                    whitneyfrancis@example.com
                  </div>
                </div>
                <a
                  href="#"
                  className="ml-auto flex-shrink-0 bg-white p-2 text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">View notifications</span>
                  <FiBell className="h-6 w-6" />
                </a>
              </div>
              <div className="mt-3 max-w-8xl mx-auto px-2 space-y-1 sm:px-4">
                <a
                  href="#"
                  className="block rounded-md py-2 px-3 text-base font-medium text-gray-900 hover:bg-gray-50"
                >
                  Your Profile
                </a>
                <a
                  href="#"
                  className="block rounded-md py-2 px-3 text-base font-medium text-gray-900 hover:bg-gray-50"
                >
                  Sign out
                </a>
              </div>
            </div>
          </nav>
        </div>
      </header>
      {/* Bottom section */}
      <div className="min-h-0 flex-1 flex overflow-hidden">
        {/* Narrow sidebar*/}
        <nav
          aria-label="Sidebar"
          className="hidden md:block md:flex-shrink-0 bg-gray-900 dark:bg-gray-200 md:overflow-y-auto"
        >
          <div className="relative w-20 flex flex-col p-3 space-y-3">
            <a
              href="#"
              className="bg-gray-900 dark:bg-gray-200 text-white dark:text-gray-700 flex-shrink-0 inline-flex items-center justify-center h-14 w-14 rounded-lg"
            >
              <span className="sr-only">Open</span>
              <FiInbox className="h-6 w-6" />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:bg-gray-700 flex-shrink-0 inline-flex items-center justify-center h-14 w-14 rounded-lg"
            >
              <span className="sr-only">Archive</span>

              <FiArchive className="h-6 w-6" />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:bg-gray-700 flex-shrink-0 inline-flex items-center justify-center h-14 w-14 rounded-lg"
            >
              <span className="sr-only">Customers</span>
              <FiUser className="h-6 w-6" />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:bg-gray-700 flex-shrink-0 inline-flex items-center justify-center h-14 w-14 rounded-lg"
            >
              <span className="sr-only">Flagged</span>
              <FiFlag className="h-6 w-6" />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:bg-gray-700 flex-shrink-0 inline-flex items-center justify-center h-14 w-14 rounded-lg"
            >
              <span className="sr-only">Spam</span>
              {/* Heroicon name: outline/ban */}
              <FiSlash className="h-6 w-6" />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:bg-gray-700 flex-shrink-0 inline-flex items-center justify-center h-14 w-14 rounded-lg"
            >
              <span className="sr-only">Drafts</span>
              {/* Heroicon name: outline/pencil-alt */}
              <FiEdit2 className="h-6 w-6" />
            </a>
          </div>
        </nav>
        {/* Main area */}
        <main className="min-w-0 flex-1 border-t border-gray-200 lg:flex">
          {/* Primary column */}
          <section
            aria-labelledby="primary-heading"
            className="min-w-0 flex-1 h-full flex flex-col overflow-hidden lg:order-last"
          >
            <h1 id="primary-heading" className="sr-only">
              Home
            </h1>
            {/* Your content */}
          </section>
          {/* Secondary column (hidden on smaller screens) */}
          <aside className="hidden lg:block lg:flex-shrink-0 lg:order-first">
            <div className="h-full relative flex flex-col w-96 border-r border-gray-200 bg-gray-100 dark:bg-gray-800 dark:border-gray-600">
              <ul className="divide-y divide-gray-200 dark:divide-gray-600 bg-white dark:bg-gray-900">
                {data.product.map(renderItem)}
              </ul>
            </div>
          </aside>
        </main>
      </div>
    </div>
  );
};

export default PlaygroundPage;
