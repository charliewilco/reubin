import { Newsreader, Source_Code_Pro } from "next/font/google";

export const SERIF_FONT = Newsreader({
	weight: "variable",
	subsets: ["latin"],
	fallback: ["ui-serif", "Charter", "Georgia", "serif"],
	display: "swap",
	variable: "--font-newsreader",
	preload: false,
});

export const MONOSPACE_FONT = Source_Code_Pro({
	weight: "variable",
	subsets: ["latin"],
	fallback: [
		"ui-monospace",
		"SFMono-Regular",
		"Menlo",
		"Monaco",
		"Consolas",
		'"Liberation Mono"',
		'"Courier New"',
		"monospace",
	],
	variable: "--font-source-code",
	display: "swap",
});
