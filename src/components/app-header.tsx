import { Auth } from "$/lib/auth";
import { cookies } from "next/headers";
import { LogoSmall } from "./logo";

interface AppHeaderProps {
	title?: string;
	children?: React.ReactNode;
}

export async function AppHeader(props: AppHeaderProps) {
	let authRequest = Auth.handleRequest({ cookies });
	const { user } = await authRequest.validateUser();

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
							<object
								className="mx-auto block h-8 w-8 rounded-full bg-gradient-to-tr from-amber-500 to-red-500"
								title={user.username}
							/>
							<div className="sr-only">
								<p>{user.username}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
}
