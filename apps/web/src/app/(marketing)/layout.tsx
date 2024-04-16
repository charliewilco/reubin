import { SiteFooter } from '$/components/site-footer'
import { SiteHeader } from '$/components/site-header'

interface LayoutProps {
	children?: React.ReactNode
}

export default function MarketingLayout({ children }: LayoutProps) {
	return (
		<div>
			<SiteHeader />
			<main>{children}</main>
			<SiteFooter />
		</div>
	)
}
