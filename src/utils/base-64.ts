export function encode(str: string) {
	return Buffer.from(str).toString("base64");
}

export function decode(base64: string) {
	return Buffer.from(base64, "base64").toString("utf-8");
}
