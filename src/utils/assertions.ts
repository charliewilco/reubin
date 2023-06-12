export function isObject(item: any): item is object {
	return Boolean(item && typeof item === "object" && !Array.isArray(item));
}
