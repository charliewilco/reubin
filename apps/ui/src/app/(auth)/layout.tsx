export default function Layout({ children }: React.PropsWithChildren<{}>) {
	return (
		<div>
			<h1> AAUTHH LAYOUT</h1>

			<div className="mx-auto max-w-md">{children}</div>
		</div>
	);
}
