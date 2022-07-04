interface ActivityIndicatorProps {}

export const LoadingIndicator = ({}: ActivityIndicatorProps) => {
	return (
		<div className="Loading" role="alert" aria-busy="true">
			<svg height="100%" viewBox="0 0 32 32" width="100%">
				<circle
					cx="16"
					cy="16"
					fill="none"
					r="14"
					strokeWidth="4"
					stroke="var(--highlight)"
					opacity="0.2"
				/>
				<circle
					cx="16"
					cy="16"
					fill="none"
					r="14"
					strokeWidth="4"
					stroke="var(--highlight)"
					strokeDashoffset={60}
					strokeDasharray={80}
				/>
			</svg>
		</div>
	);
};
