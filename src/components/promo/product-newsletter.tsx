export function ProductNewsletter() {
	return (
		<div className="mt-16 border-t border-zinc-900/10 pt-8 sm:mt-20 lg:mt-24 lg:flex lg:items-center lg:justify-between">
			<div>
				<h3 className="text-sm font-semibold leading-6">Subscribe to our newsletter</h3>
				<p className="mt-2 font-mono text-sm leading-6 opacity-50">
					The latest news, articles, and resources, sent to your inbox weekly.
				</p>
			</div>
			<form className="mt-6 sm:flex sm:max-w-md lg:mt-0">
				<label htmlFor="email-address" className="sr-only">
					Email address
				</label>
				<input
					type="email"
					name="email-address"
					id="email-address"
					autoComplete="email"
					required
					className="w-full min-w-0 appearance-none rounded-md border-0 bg-white px-3 py-1.5 text-base text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:w-56 sm:text-sm sm:leading-6"
					placeholder="Enter your email"
				/>
				<div className="mt-4 sm:ml-4 sm:mt-0 sm:flex-shrink-0">
					<button
						type="submit"
						className="flex w-full items-center justify-center rounded-md bg-sky-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600">
						Subscribe
					</button>
				</div>
			</form>
		</div>
	);
}
