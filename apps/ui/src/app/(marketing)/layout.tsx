import Image from "next/image";
import Link from "next/link";

import { SiteFooter } from "../../components/site-footer";

interface LayoutProps {
  children?: React.ReactNode;
}

export default function MarketingLayout({ children }: LayoutProps) {
  return (
    <div>
      <header id="header" className="mx-auto mt-8 max-w-7xl p-2">
        <Link href="/" className="block">
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

      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}
