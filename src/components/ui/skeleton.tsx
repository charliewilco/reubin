import { cx } from "class-variance-authority";

export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
	return <div className={cx("bg-muted animate-pulse rounded-md", className)} {...props} />;
}
