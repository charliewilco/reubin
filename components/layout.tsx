import { Banner } from "./banner";
import { DownloadBlock } from "./download";
import { IconHeader } from "./icon-header";
import { Footer } from "./footer";

export const MarketingLayout: React.FC<{ title?: string }> = ({
  title,
  children,
}) => {
  return (
    <>
      <Banner />
      <IconHeader title={title} />

      <main className="px-2 max-w-4xl mx-auto">{children}</main>

      <DownloadBlock />

      <Footer />
    </>
  );
};
