import { cx } from "class-variance-authority";

interface CardProps
	extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export function Card({ className, ...props }: CardProps) {
	return (
		<div
			className={cx(className, "rounded-lg bg-white p-4 shadow dark:bg-zinc-800")}
			{...props}
		/>
	);
}
