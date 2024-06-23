import { MONOSPACE_FONT, SERIF_FONT } from "$/utils/fonts";
import { cx } from "class-variance-authority";
import type { Metadata } from "next";

import "modern-normalize";
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
	let className = cx(SERIF_FONT.variable, MONOSPACE_FONT.variable);
	return (
		<html lang="en" className={className}>
			<head />
			<body className="">{children}</body>
		</html>
	);
}
