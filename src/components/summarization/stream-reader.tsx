import { Suspense } from "react";
import { quickMarkdownParse } from "$/utils/quick-markdown";

export async function AIStreamReader({
	reader,
}: {
	reader: ReadableStreamDefaultReader<any>;
}) {
	const { done, value } = await reader.read();

	if (done) {
		return null;
	}

	const text = new TextDecoder().decode(value);
	let __html = quickMarkdownParse(text.trimStart());

	return (
		<>
			<div dangerouslySetInnerHTML={{ __html }} />

			<Suspense>
				<AIStreamReader reader={reader} />
			</Suspense>
		</>
	);
}
