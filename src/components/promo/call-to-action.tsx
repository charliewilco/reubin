import Image from "next/image";
import Newspaper from "./roman-kraft-unsplash.jpg";
import Link from "next/link";

export function CallToAction() {
	return (
		<section className="-mx-2 md:mx-0">
			<div className="relative grid min-h-min grid-cols-2 overflow-hidden bg-sky-700 text-zinc-100 dark:bg-sky-400 dark:text-zinc-900 lg:grid-cols-4 lg:rounded-lg">
				<div className="col-span-2">
					<div className="px-6 pb-12 pt-10 sm:px-16 sm:pt-16 lg:py-16 lg:pr-0 xl:px-20 xl:py-20">
						<h2 className="text-3xl font-bold tracking-tight  sm:text-4xl">
							<span className="block">
								Ready to stay connected with all your favorite content?
							</span>
						</h2>
						<p className="mt-4 font-mono text-lg leading-6 text-sky-200 dark:text-sky-900">
							Get started with Zaptread today.
						</p>
						<Link
							href="/register"
							className="mt-8 inline-flex items-center rounded-md border border-transparent bg-white px-5 py-3 text-base font-medium text-sky-600 shadow hover:bg-indigo-50">
							Sign up for free
						</Link>
					</div>
				</div>

				<div className="col-span-2">
					<Image
						src={Newspaper}
						alt="App screenshot"
						className="object-cover opacity-75"
						priority
					/>
				</div>
			</div>
		</section>
	);
}
