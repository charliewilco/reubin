import { JetBrains_Mono, Newsreader, Inter } from "next/font/google";

export const SANS_FONT = Inter({
	weight: "variable",
	subsets: ["latin"],
	fallback: [
		"-apple-system",
		"BlinkMacSystemFont",
		"Segoe UI",
		"Roboto",
		"Helvetica Neue",
		"Arial",
		"Noto Sans",
		"sans-serif",
		"Apple Color Emoji",
		"Segoe UI Emoji",
		"Segoe UI Symbol",
		"Noto Color Emoji",
	],
	display: "swap",
	variable: "--font-inter",
	preload: false,
});

export const SERIF_FONT = Newsreader({
	weight: "variable",
	subsets: ["latin"],
	fallback: ["ui-serif", "Charter", "Georgia", "serif"],
	display: "swap",
	variable: "--font-newsreader",
	preload: false,
});

export const MONOSPACE_FONT = JetBrains_Mono({
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
	variable: "--font-jetbrains-mono",
	display: "swap",
});
