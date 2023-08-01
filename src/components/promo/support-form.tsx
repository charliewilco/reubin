export function SupportForm() {
	return (
		<form action="#" className="space-y-16">
			<div>
				<label htmlFor="email" className="mb-4 block text-lg text-zinc-900 dark:text-zinc-300">
					Your email
				</label>
				<input
					type="email"
					id="email"
					className="focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light block w-full rounded border border-zinc-300 bg-zinc-50 p-2.5 text-sm text-zinc-900 shadow-sm dark:border-zinc-600 dark:bg-zinc-700 dark:text-white dark:placeholder-zinc-400"
					placeholder="name@flowbite.com"
					required
				/>
			</div>
			<div>
				<label
					htmlFor="subject"
					className="mb-4 block text-lg text-zinc-900 dark:text-zinc-300">
					Subject
				</label>
				<input
					type="text"
					id="subject"
					className="focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light block w-full rounded border border-zinc-300 bg-zinc-50 p-3 text-sm text-zinc-900 shadow-sm dark:border-zinc-600 dark:bg-zinc-700 dark:text-white dark:placeholder-zinc-400"
					placeholder="Let us know how we can help you"
					required
				/>
			</div>
			<div className="sm:col-span-2">
				<label
					htmlFor="message"
					className="mb-4 block text-lg text-zinc-900 dark:text-zinc-400">
					Your message
				</label>
				<textarea
					id="message"
					rows={6}
					className="focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded border border-zinc-300 bg-zinc-50 p-2.5 text-sm text-zinc-900 shadow-sm dark:border-zinc-600 dark:bg-zinc-700 dark:text-white dark:placeholder-zinc-400"
					placeholder="Leave a comment..."
				/>
			</div>
			<button
				type="submit"
				className="focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 rounded-lg bg-sky-700 px-5 py-3 text-center text-sm font-medium text-white hover:bg-sky-800 focus:outline-none focus:ring-4 sm:w-fit">
				Send message
			</button>
		</form>
	);
}
