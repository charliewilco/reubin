import Link from "next/link";
import { Globe, Twitter, Github } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="mx-auto max-w-7xl py-2 px-2" role="contentinfo">
      <div>
        <nav className="flex flex-wrap">
          <div className="py-2 pr-5">
            <Link href="/">
              <a>About</a>
            </Link>
          </div>
          <div className="px-5 py-2">
            <Link href="/changelog">
              <a>Changelog</a>
            </Link>
          </div>
          <div className="px-5 py-2">
            <Link href="/login">
              <a>Login</a>
            </Link>
          </div>
          <div className="px-5 py-2">
            <Link href="/privacy">
              <a>Privacy Policy</a>
            </Link>
          </div>
        </nav>
        <div className="mt-8 flex">
          <a href="https://charliewil.co/" className="text-gray-400 hover:text-gray-500">
            <Globe className="h-6 w-6" />
          </a>
          <a
            href="https://twitter.com/_charliewilco"
            className="ml-6 text-gray-400 hover:text-gray-500">
            <span className="sr-only">Twitter</span>
            <Twitter className="h-6 w-6" />
          </a>
          <a
            href="https://github.com/charliewilco"
            className="ml-6 text-gray-400 hover:text-gray-500">
            <span className="sr-only">GitHub</span>
            <Github className="h-6 w-6" />
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
}
