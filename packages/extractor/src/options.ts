import type * as cheerio from "cheerio";

export type SerializerFn = (element: cheerio.CheerioAPI) => string;

export interface ReadabilityOptions {
	maxElemsToParse: number;
	nbTopCandidates: number;
	charThreshold: number;
	classesToPreserve: string[];
	keepClasses: boolean;
	serializer: SerializerFn;
	disableJSONLD: boolean;
	allowedVideoRegex: RegExp;
	linkDensityModifier: number;
}

export const DEFAULT_OPTIONS: Omit<ReadabilityOptions, "serializer"> = {
	maxElemsToParse: 0,
	nbTopCandidates: 5,
	charThreshold: 500,
	classesToPreserve: [],
	keepClasses: false,
	disableJSONLD: false,
	allowedVideoRegex: /embed|video/i,
	linkDensityModifier: 0,
};

export function mergeOptions(
	options: Partial<ReadabilityOptions>,
): Omit<ReadabilityOptions, "serializer"> {
	return {
		...DEFAULT_OPTIONS,
		...options,
		classesToPreserve: DEFAULT_OPTIONS.classesToPreserve.concat(
			options.classesToPreserve || [],
		),
	};
}
