interface AppWrapperProps {
	children?: React.ReactNode;
	onRetry(): void;
}

export function AppWrapper({ children, onRetry }: AppWrapperProps) {
	return (
		<div>
			<header className="mb-4 flex items-center justify-between ">
				<h2 className="flex-1 text-xl font-semibold">Available Feeds</h2>
				<button aria-label="Refresh" onClick={onRetry}>
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						className="h-5 w-5 text-zinc-400"
						aria-hidden="true">
						<use href="#icon-refresh"></use>
					</svg>
				</button>
			</header>

			{children}
		</div>
	);
}
