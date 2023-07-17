import { LogoSmall } from "./logo";

interface AppHeaderProps {
	title?: string;
	children?: React.ReactNode;
	username?: string;
}

export function AppHeader(props: AppHeaderProps) {
	return (
		<header className="w-full border-b border-zinc-200 px-4 backdrop-blur-sm backdrop-saturate-150 dark:border-zinc-700">
			<div className="flex items-center justify-between">
				<div className="flex items-center">
					<LogoSmall />
					{props.title && <h1 className="ml-4">{props.title}</h1>}
				</div>

				<div>
					<div className="flex justify-end gap-4">
						{props.children}
						<div>
							{props.username ? (
								<>
									<object
										className="mx-auto block h-8 w-8 rounded-full bg-gradient-to-tr from-amber-500 to-red-500 shadow-md"
										title={props.username}
									/>
									<div className="sr-only">
										<p>{props.username}</p>
									</div>
								</>
							) : null}
						</div>
					</div>
				</div>
			</div>
		</header>
	);
}
