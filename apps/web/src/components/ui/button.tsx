"use client";

import { cx } from "class-variance-authority";
import { forwardRef } from "react";
import styles from "./button.module.css";

type BaseButtonProps = React.DetailedHTMLProps<
	React.ButtonHTMLAttributes<HTMLButtonElement>,
	HTMLButtonElement
>;

const Button = forwardRef<HTMLButtonElement, BaseButtonProps>((props, ref) => {
	return <button {...props} ref={ref} />;
});

Button.displayName = "UIButton";

const IconButton = forwardRef<HTMLButtonElement, BaseButtonProps>((props, ref) => {
	return <button {...props} className={cx(props.className, styles.iconButton)} ref={ref} />;
});

IconButton.displayName = "UIIconButton";

function SuperButton({ className, ..._props }: BaseButtonProps) {
	return <Button {..._props} className={cx(styles.superButton, className)} ref={() => {}} />;
}

export { SuperButton, Button, IconButton };
