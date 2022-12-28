import { classNames } from "./class-names";

interface CardProps
	extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export function Card({ className, ...props }: CardProps) {
	const _className = classNames(className, "bg-white dark:bg-zinc-800 shadow rounded-lg p-4");
	return <div className={_className} {...props} />;
}
