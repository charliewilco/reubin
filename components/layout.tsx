import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import { FiGithub, FiTwitter, FiGlobe } from "react-icons/fi";

interface ILayoutProps {
  title?: string;
  addressbar: string;
}

export const MarketingLayout: React.FC<
  React.PropsWithChildren<ILayoutProps>
> = ({ title, addressbar, children }) => {
  return (
    <div>
      <Head>
        <title>{addressbar}</title>
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
      <header id="header" className="Wrapper">
        <object>
          <Link href="/">
            <a>
              <Image
                id="icon"
                width={128}
                height={128}
                src="/app-icon-play-store.png"
                alt="App icon for Reubin application"
              />
            </a>
          </Link>
        </object>

        <h1>{title ?? "Reubin"}</h1>
      </header>

      <main className="Wrapper">{children}</main>

      <aside className="Wrapper">
        <div>
          <div>
            <h2>Get Reubin</h2>
          </div>
        </div>
      </aside>
      <footer className="Wrapper">
        <div>
          <nav className="flex flex-wrap justify-center">
            <div className="px-5 py-2">
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
              <Link href="/privacy">
                <a>Privacy Policy</a>
              </Link>
            </div>
          </nav>
          <div className="mt-8 flex justify-center">
            <a
              href="https://charliewil.co/"
              className=" text-gray-400 hover:text-gray-500"
            >
              <FiGlobe className="h-6 w-6" />
            </a>
            <a
              href="https://twitter.com/_charliewilco"
              className="ml-6 text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">Twitter</span>
              <FiTwitter className="h-6 w-6" />
            </a>
            <a
              href="https://github.com/charliewilco"
              className="ml-6 text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">GitHub</span>
              <FiGithub className="h-6 w-6" />
            </a>
          </div>
          <div className="mt-8">
            <p className="text-center text-base leading-6 text-gray-400">
              © 2021 Charlie Peters. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
