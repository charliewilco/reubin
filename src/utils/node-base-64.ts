/**
 * Basically this works on the server
 * @param str {string}
 * @returns {string}
 */
export function encode(str: string): string {
	return Buffer.from(str).toString("base64");
}

/**
 * Basically this works on the server
 * @param base64 {string}
 * @returns {string}
 */
export function decode(base64: string): string {
	return Buffer.from(base64, "base64").toString("utf-8");
}
