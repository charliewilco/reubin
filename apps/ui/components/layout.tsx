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
      <header id="header" className="mx-auto mt-8 max-w-7xl p-2">
        <Link href="/" passHref>
          <a className="block">
            <Image
              id="icon"
              width={32}
              height={32}
              className="block"
              src="/app-icon-play-store.png"
              alt="App icon for Reubin application"
            />
          </a>
        </Link>
        {title && <h1>{title}</h1>}
      </header>

      <main>{children}</main>
      <SiteFooter />
    </div>
  );
};
