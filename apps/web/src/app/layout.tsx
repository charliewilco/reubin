import { JetBrains_Mono, Newsreader } from "next/font/google";
import type { Metadata } from "next";
import "modern-normalize";
import "./styles.css";

const SERIF_FONT = Newsreader({
	weight: "variable",
	subsets: ["latin"],
	fallback: ["ui-serif", "Charter", "Georgia", "serif"],
	display: "swap",
	variable: "--font-serif",
	preload: false,
});

const MONOSPACE_FONT = JetBrains_Mono({
	weight: "variable",
	subsets: ["latin"],
	fallback: [
		"ui-monospace",
		"SFMono-Regular",
		"Menlo",
		"Monaco",
		"Consolas",
		"Liberation Mono",
		"Courier New",
		"monospace",
	],
	variable: "--font-monospace",
	display: "swap",
});

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
	let className = [SERIF_FONT.variable, MONOSPACE_FONT.variable].join(" ");
	return (
		<html lang="en" className={className}>
			<head />
			<body className="">{children}</body>
		</html>
	);
}
