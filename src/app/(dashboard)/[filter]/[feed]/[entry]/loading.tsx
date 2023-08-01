import { Skeleton } from "$/components/ui/skeleton";

export default function LoadingEntry() {
	return (
		<div className="absolute bottom-0 left-0 right-0 top-0 w-full ">
			<article className="mx-auto max-w-2xl px-8 pb-16">
				<header className="py-8">
					<div className="mt-6" />
					<Skeleton className="mb-2 h-16 w-full" />
					<Skeleton className="h-4 w-1/4" />
				</header>
				<section className="mb-4 space-y-2">
					<Skeleton className="h-6 w-full" />
					<Skeleton className="h-6 w-full" />
					<Skeleton className="h-6 w-full" />
					<Skeleton className="mb-2 h-6 w-1/3" />
				</section>
				<section className="mb-4 space-y-2">
					<Skeleton className="h-6 w-full" />
					<Skeleton className="h-6 w-full" />
					<Skeleton className="h-6 w-full" />
					<Skeleton className="mb-2 h-6 w-2/3" />
				</section>
				<section className="space-y-2">
					<Skeleton className="h-6 w-full" />
					<Skeleton className="h-6 w-full" />
					<Skeleton className="h-6 w-1/4" />
				</section>
			</article>
		</div>
	);
}
