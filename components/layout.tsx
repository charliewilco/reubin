import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Banner } from "./banner";
import {
  AiFillGithub,
  AiOutlineGlobal,
  AiOutlineTwitter,
  AiFillApple,
  AiFillAndroid,
} from "react-icons/ai";

interface ILayoutProps {
  title?: string;
  addressbar: string;
}

export const MarketingLayout: React.FC<ILayoutProps> = ({
  title,
  addressbar,
  children,
}) => {
  return (
    <div>
      <Banner />
      <Head>
        <title>{addressbar}</title>
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
      <header id="header" className="mx-auto max-w-xl px-4 py-32 text-center">
        <object className="block mb-8">
          <Link href="/">
            <a className="mx-auto w-32 h-32 block">
              <Image
                id="icon"
                width={128}
                height={128}
                className="mx-auto w-32 h-32 block object-contain"
                src="/app-icon-play-store.png"
                alt="App icon for Reubin application"
              />
            </a>
          </Link>
        </object>

        <h1 className="text-2xl tracking-tight leading-10 text-gray-800 dark:text-gray-100 sm:text-5xl sm:leading-none md:text-4xl">
          {title ?? "Reubin"}
        </h1>
      </header>

      <main className="px-2 max-w-4xl mx-auto">{children}</main>

      <aside className="mx-auto max-w-4xl px-2 mb-16">
        <div className="bg-gradient-to-tr from-yellow-800 via-yellow-600 to-yellow-400 overflow-hidden shadow-xl py-8 px-4">
          <div className="mx-auto max-w-2xl py-8 text-gray-300 text-center">
            <h2 className="text-xl font-black text-gray-800 tracking-tight sm:text-3xl">
              Get Reubin
            </h2>
            <p className="my-6 mx-auto max-w-2xl text-lg text-yellow-100">
              Free of ads and in-app purchases, this is the only Feedbin reader
              on Android.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <button className="flex items-center justify-center w-full rounded-md border border-transparent px-5 py-3 text-base font-medium shadow hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-rose-500 sm:px-10 bg-gray-900">
                <AiFillApple size={18} />
                <span className="ml-2"> Coming Soon</span>
              </button>
              <button className="flex items-center justify-center w-full rounded-md border border-transparent px-5 py-3 text-base font-medium shadow hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-rose-500 sm:px-10 bg-gray-900">
                <AiFillAndroid size={18} />
                <span className="ml-2"> Download from Play Store</span>
              </button>
            </div>
          </div>
        </div>
      </aside>
      <footer className="max-w-4xl px-2 mx-auto py-12">
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
          <div className="mt-8">
            <p className="text-center text-base leading-6 text-gray-400">
              © 2021 Charlie Peters. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
      <style jsx>{`
        aside,
        header,
        footer,
        main {
          margin: 0 auto;
          max-width: 64rem;
          width: 100%;
          padding: 0 0.5rem;
        }
      `}</style>
    </div>
  );
};
