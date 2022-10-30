import "../components/styles.css";

export default function RootLayout({ children }: React.PropsWithChildren<{}>) {
	return (
		<html className="dark:bg-zinc-900 dark:text-white">
			<body>{children}</body>
		</html>
	);
}
