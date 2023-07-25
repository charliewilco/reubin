import Image from "next/image";
import Link from "next/link";
import IconImage from "../../../public/app-icon-play-store.png";

import { SiteFooter } from "../../components/site-footer";
import { SiteHeader } from "$/components/site-header";

interface LayoutProps {
	children?: React.ReactNode;
}

export default function MarketingLayout({ children }: LayoutProps) {
	return (
		<div>
			<SiteHeader />
			<main>{children}</main>
			<SiteFooter />
		</div>
	);
}
