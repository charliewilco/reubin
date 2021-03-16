import { FiSearch, FiBell } from "react-icons/fi";

export const InboxAppHeader = () => (
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

    {/* Menu button area */}

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
        </div>
      </div>
    </div>
  </header>
);
