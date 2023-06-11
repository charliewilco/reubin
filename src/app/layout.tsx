import type { Metadata } from "next";
import "../components/styles.css";

export const metadata: Metadata = {
	title: {
		default: "Reubin | An RSS Client for the Next Generation",
		template: "%s | Reubin"
	},
	icons: [
		{
			type: "image/png",
			rel: "icon",
			url: "/favicon.png",
		},
	],
};

export default function RootLayout({ children }: React.PropsWithChildren<{}>) {
	return (
		<html className="dark:bg-zinc-900 dark:text-white">
			<head />
			<body>{children}</body>
		</html>
	);
}
