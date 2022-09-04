import { Logo } from "./logo";

interface AppHeaderProps {
	title: string;
	children?: React.ReactNode;
}

export const AppHeader = (props: AppHeaderProps) => {
	return (
		<header className="w-full border-b border-zinc-700 px-4">
			<div className="flex items-center">
				<Logo />
				<h1 className="ml-4">{props.title}</h1>
			</div>

			<div>{props.children}</div>
		</header>
	);
};