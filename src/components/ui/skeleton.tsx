import { cx } from "class-variance-authority";

export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={cx("animate-pulse rounded-md bg-zinc-800 dark:bg-zinc-300", className)}
			{...props}
		/>
	);
}
