import { CohereStream } from "ai";
import { Suspense } from "react";

import { Env } from "$/lib/env";
import { AIStreamReader } from "./stream-reader";
import { SummarizationError } from "./error";
import { SummarizationWrapper } from "./wrapper-ui";

interface SummaryAIStreamProps {
	content: string;
}
export async function SummaryAIStream(props: SummaryAIStreamProps) {
	const body = JSON.stringify({
		prompt: `Summarize the following article in three bullet points: ${props.content}`,
		model: "command-nightly",
		max_tokens: 300,
		stop_sequences: [],
		temperature: 0.9,
		return_likelihoods: "NONE",
		stream: true,
	});

	const response = await fetch("https://api.cohere.ai/v1/generate", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${Env.$vars.COHERE_API_KEY}`,
		},
		body,
	});

	// Check for errors
	if (!response.ok) {
		let errorText = await response.text();
		let error = JSON.parse(errorText);
		return <SummarizationError message={error.message} status={response.status} />;
	}

	// Extract the text response from the Cohere stream
	const stream = CohereStream(response);
	const reader = stream.getReader();

	return (
		<SummarizationWrapper>
			<Suspense>
				<AIStreamReader reader={reader} />
			</Suspense>
		</SummarizationWrapper>
	);
}
