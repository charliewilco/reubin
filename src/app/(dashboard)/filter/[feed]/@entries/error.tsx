'use client'

interface ErrorPageProps {
	error: Error & { digest?: string }
	reset: () => void
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
	console.log(error)

	return (
		<div className="flex h-full w-full flex-col justify-center px-4 py-8 ">
			<div className="opacity-75">
				<h2 className=" text-center text-lg">Something went wrong!</h2>
				<div className="text-sm">
					<p>{error.message}</p>
					{error.digest && (
						<p>
							Digest <code>{error.digest}</code>
						</p>
					)}
				</div>
			</div>

			<button type="button" onClick={reset}>
				Try again
			</button>
		</div>
	)
}
