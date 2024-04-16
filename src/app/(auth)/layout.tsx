import { redirect } from 'next/navigation'
import { LogoDisplay } from '$/components/logo'
import { Controllers } from '$/lib/controllers'
import { cookies } from 'next/headers'

interface LayoutProps {
	children: React.ReactNode
}

export default async function Layout({ children }: LayoutProps) {
	const result = await Controllers.session.getUserSession()
	if (result?.session) redirect('/all')

	return (
		<div className="px-2 py-16">
			<div className="mb-4 flex justify-center">
				<LogoDisplay />
			</div>
			<div className="mx-auto max-w-md">{children}</div>
		</div>
	)
}
