interface EntryLayoutProps {
	children?: React.ReactNode;
}

export default function EntryLayout({ children }: EntryLayoutProps) {
	return (
		<section
			aria-labelledby="primary-heading"
			className="col-span-7 h-full overflow-y-scroll dark:bg-zinc-800">
			<div className="relative">
				<h1 id="primary-heading" className="sr-only">
					Entry
				</h1>
				<div className="absolute bottom-0 left-0 right-0 top-0 w-full ">{children}</div>
			</div>
		</section>
	);
}
