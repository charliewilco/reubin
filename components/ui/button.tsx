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

const SuperButton = ({ className, ..._props }: BaseButtonProps) => {
	return (
		<Button
			{..._props}
			className={classNames(
				"inline-flex items-center justify-center rounded-sm px-4",
				"h-8",
				"bg-blue-300 text-blue-700 hover:shadow-sm",
				className
			)}
			ref={() => {}}
		/>
	);
};

export { SuperButton, Button, IconButton };
