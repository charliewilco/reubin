import Image from "next/image";
import Head from "next/head";
import Link from "next/link";

import { SiteFooter } from "./site-footer";

interface ILayoutProps {
  addressbar: string;
  title?: string;
  children?: React.ReactNode;
}

export const MarketingLayout = ({ title, addressbar, children }: ILayoutProps) => {
  return (
    <div>
      <Head>
        <title>{addressbar}</title>
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
      <header id="header" className="mx-auto mt-8 max-w-6xl py-2 pt-4 text-center">
        <Link href="/" passHref>
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

        <h1>{title ?? "Reubin"}</h1>
      </header>

      <main className="mx-auto max-w-6xl py-2">{children}</main>
      <SiteFooter />
    </div>
  );
};
