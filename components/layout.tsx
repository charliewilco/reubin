import { Banner } from "./banner";
import { DownloadBlock } from "./download";
import { IconHeader } from "./icon-header";
import { Footer } from "./footer";
import Head from "next/head";

export const MarketingLayout: React.FC<{ title?: string }> = ({
  title,
  children,
}) => {
  return (
    <>
      <Banner />
      <Head>
        <link rel="shortcut icon" href="favicon.png" />
      </Head>
      <IconHeader title={title} />

      <main className="px-2 max-w-4xl mx-auto">{children}</main>

      <DownloadBlock />

      <Footer />
    </>
  );
};
