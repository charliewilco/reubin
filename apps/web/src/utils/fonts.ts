import { JetBrains_Mono, Newsreader } from "next/font/google";

export const SERIF_FONT = Newsreader({
	weight: "variable",
	subsets: ["latin"],
	fallback: ["ui-serif", "Charter", "Georgia", "serif"],
	display: "swap",
	variable: "--font-serif",
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
	variable: "--font-monospace",
	display: "swap",
});
