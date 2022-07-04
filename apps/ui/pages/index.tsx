import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import { SiteFooter } from "../components/site-footer";

const IndexPage = () => (
  <div>
    <Head>
      <title>Reubin | An RSS Client for the Next Generation</title>
      <link rel="icon" type="image/png" href="/favicon.png" />
    </Head>
    <header id="header" className="mx-auto mt-8 max-w-7xl p-2">
      <Link href="/" passHref className="block">
        <Image
          id="icon"
          width={32}
          height={32}
          className="block"
          src="/app-icon-play-store.png"
          alt="App icon for Reubin application"
        />
      </Link>
    </header>
    <main className="mx-auto max-w-7xl px-2 py-16">
      <h2 className="font-display inline-block bg-gradient-to-tr from-sky-200 to-sky-600 bg-clip-text text-8xl font-bold tracking-tighter text-transparent">
        Reubin
      </h2>
      <p className="text-2xl opacity-50">RSS for the next generation. Coming Soon.</p>
    </main>
    <SiteFooter />
  </div>
);

export default IndexPage;
