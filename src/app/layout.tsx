import type { Metadata } from "next";
import "./styles.css";

export const metadata: Metadata = {
	title: {
		default: "Reubin | An RSS Client for the Next Generation",
		template: "%s | Reubin",
	},
	icons: [
		{
			type: "image/png",
			rel: "icon",
			url: "/favicon.png",
		},
	],
};

interface LayoutProps {
	children: React.ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
	return (
		<html className="dark:bg-zinc-900 dark:text-white">
			<head />
			<body className="">{children}</body>
		</html>
	);
}
