interface LayoutProps {
	feeds: React.ReactNode
	children: React.ReactNode
	params: {
		slug: string
	}
}

export default function Layout({ params, feeds }: LayoutProps) {
	console.log(params)
	return (
		<div>
			<h2>Layout</h2>
			{feeds}
		</div>
	)
}
