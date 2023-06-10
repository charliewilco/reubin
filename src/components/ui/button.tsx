import { forwardRef } from "react";
import { classNames } from "./class-names";

type BaseButtonProps = React.DetailedHTMLProps<
	React.ButtonHTMLAttributes<HTMLButtonElement>,
	HTMLButtonElement
>;

const Button = forwardRef<HTMLButtonElement, BaseButtonProps>((props, ref) => {
	return <button {...props} ref={ref} />;
});

Button.displayName = "UIButton";

const IconButton = forwardRef<HTMLButtonElement, BaseButtonProps>((props, ref) => {
	return (
		<button
			{...props}
			className={classNames(
				props.className,
				"rounded-full",
				"inline-flex h-6 w-6 items-center justify-center"
			)}
			ref={ref}
		/>
	);
});

IconButton.displayName = "UIIconButton";

function SuperButton({ className, ..._props }: BaseButtonProps) {
	return (
		<Button
			{..._props}
			className={classNames(
				"inline-flex rounded-sm px-4 py-1",
				"font-semibold",
				"bg-blue-300 text-base text-blue-700 shadow-sm",
				className
			)}
			ref={() => {}}
		/>
	);
}

export { SuperButton, Button, IconButton };
