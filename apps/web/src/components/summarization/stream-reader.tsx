import { Suspense } from "react";
import { parse } from "@r/quick-markdown";

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
	let __html: TrustedHTML = parse(text.trimStart());

	return (
		<>
			<div dangerouslySetInnerHTML={{ __html }} />

			<Suspense>
				<AIStreamReader reader={reader} />
			</Suspense>
		</>
	);
}
