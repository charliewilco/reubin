"use client";

import { forwardRef } from "react";
import { cx } from "class-variance-authority";

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
			className={cx(
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
			className={cx(
				"inline-flex rounded-sm px-4 py-1",
				"font-semibold",
				"bg-sky-500 text-base text-white shadow-sm",
				className
			)}
			ref={() => {}}
		/>
	);
}

export { SuperButton, Button, IconButton };
