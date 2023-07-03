import type { Metadata } from "next";
import "./styles.css";
import { cx } from "class-variance-authority";
import { MONOSPACE_FONT, SERIF_FONT } from "$/utils/fonts";

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
	let className= cx('dark:bg-zinc-900 dark:text-white', SERIF_FONT.variable, MONOSPACE_FONT.variable)
	return (
		<html className={className}>
			<head />
			<body className="">{children}</body>
		</html>
	);
}
