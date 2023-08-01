export function getDateString(date: Date | string) {
	return new Date(date).toDateString();
}

type DateExtractor<T> = (a: T) => Date | string;
type DateExtractorArgs<T> = { a: T; b: T };

export function sortGenericByNearest<TModel>(
	args: DateExtractorArgs<TModel>,
	extractor: DateExtractor<TModel>
) {
	const now = Date.now();

	function extractAndParse(input: TModel): number {
		let value = extractor(input);
		return Math.abs(Date.parse(getDateString(value)) - now);
	}

	return extractAndParse(args.a) - extractAndParse(args.b);
}
