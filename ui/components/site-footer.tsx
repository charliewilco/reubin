import Link from "next/link";

import { FiGlobe } from "react-icons/fi";
import { SiGithub, SiTwitter } from "react-icons/si";

export const SiteFooter = () => (
  <footer className="mx-auto max-w-7xl py-2 px-2">
    <div>
      <nav className="flex flex-wrap">
        <div className="py-2 pr-5">
          <Link href="/">About</Link>
        </div>
        <div className="px-5 py-2">
          <Link href="/changelog">Changelog</Link>
        </div>
        <div className="px-5 py-2">
          <Link href="/login">Login</Link>
        </div>
        <div className="px-5 py-2">
          <Link href="/privacy">Privacy Policy</Link>
        </div>
      </nav>
      <div className="mt-8 flex">
        <a href="https://charliewil.co/" className="text-gray-400 hover:text-gray-500">
          <FiGlobe className="h-6 w-6" />
        </a>
        <a
          href="https://twitter.com/_charliewilco"
          className="ml-6 text-gray-400 hover:text-gray-500">
          <span className="sr-only">Twitter</span>
          <SiTwitter className="h-6 w-6" />
        </a>
        <a
          href="https://github.com/charliewilco"
          className="ml-6 text-gray-400 hover:text-gray-500">
          <span className="sr-only">GitHub</span>
          <SiGithub className="h-6 w-6" />
        </a>
      </div>
      <div className="mt-8">
        <p className="text-center text-sm leading-6 text-gray-400">
          © 2021 Charlie Peters. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);
