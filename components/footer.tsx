import Link from "next/link";

import {
  AiFillGithub,
  AiOutlineGlobal,
  AiOutlineTwitter,
} from "react-icons/ai";

const SiteNav = () => (
  <nav className="flex flex-wrap justify-center">
    <div className="px-5 py-2">
      <Link href="/">
        <a className={linkClassName}>About</a>
      </Link>
    </div>
    <div className="px-5 py-2">
      <Link href="/changelog">
        <a className={linkClassName}>Changelog</a>
      </Link>
    </div>
    <div className="px-5 py-2">
      <Link href="/privacy">
        <a className={linkClassName}>Privacy Policy</a>
      </Link>
    </div>
  </nav>
);

const SocialLinks = () => (
  <div className="mt-8 flex justify-center">
    <a
      href="https://charliewil.co/"
      className=" text-gray-400 hover:text-gray-500"
    >
      <AiOutlineGlobal className="h-6 w-6" />
    </a>
    <a
      href="https://twitter.com/charlespeters"
      className="ml-6 text-gray-400 hover:text-gray-500"
    >
      <span className="sr-only">Twitter</span>
      <AiOutlineTwitter className="h-6 w-6" />
    </a>
    <a
      href="https://github.com/charliewilco"
      className="ml-6 text-gray-400 hover:text-gray-500"
    >
      <span className="sr-only">GitHub</span>
      <AiFillGithub className="h-6 w-6" />
    </a>
  </div>
);

const linkClassName =
  "text-base leading-6 text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-500";

export const Footer = () => {
  return (
    <footer className="max-w-4xl px-2 mx-auto py-12">
      <div>
        <SiteNav />
        <SocialLinks />
        <div className="mt-8">
          <p className="text-center text-base leading-6 text-gray-400">
            © 2020 Charlie Peters. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
