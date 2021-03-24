import Head from "next/head";
import { Banner } from "./banner";
import { DownloadBlock } from "./download";
import { IconHeader } from "./icon-header";
import { Footer } from "./footer";

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
    <>
      <Banner />
      <Head>
        <title>{addressbar}</title>
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
      <IconHeader title={title} />

      <main className="px-2 max-w-4xl mx-auto">{children}</main>

      <DownloadBlock />
      <Footer />
    </>
  );
};
