const prefixMatch = new RegExp(/(?!xmlns)^.*:/);

export function normalize(str: string) {
	return str.toLowerCase();
}

export function firstCharLowerCase(str: string) {
	return str.charAt(0).toLowerCase() + str.slice(1);
}

export function stripPrefix(str: string) {
	return str.replace(prefixMatch, "");
}

function isNotANumber(value: any): value is number {
	return isNaN(value);
}

export function parseNumbers(str: string | number): number | string {
	if (!isNotANumber(str)) {
		// @ts-expect-error - we know it's a number like
		return str % 1 === 0 ? parseInt(str, 10) : parseFloat(str);
	}
	return str;
}

export function parseBooleans(str: string): boolean | string {
	if (/^(?:true|false)$/i.test(str)) {
		return str.toLowerCase() === "true";
	}
	return str;
}
