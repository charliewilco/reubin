"use client";
import { cx } from "class-variance-authority";
import { forwardRef } from "react";
import styles from "./input.module.css";

type InputProps = React.DetailedHTMLProps<
	React.InputHTMLAttributes<HTMLInputElement>,
	HTMLInputElement
>;

const Input = forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
	return <input {...props} className={cx(styles.input, className)} ref={ref} />;
});

Input.displayName = "Input";

type FieldsetProps = React.DetailedHTMLProps<
	React.FieldsetHTMLAttributes<HTMLFieldSetElement>,
	HTMLFieldSetElement
>;

const Fieldset = forwardRef<HTMLFieldSetElement, FieldsetProps>(
	({ className, ...props }, ref) => {
		return <fieldset {...props} className={cx(styles.fieldset, className)} ref={ref} />;
	},
);

Fieldset.displayName = "Fieldset";

type TextLabelProps = React.DetailedHTMLProps<
	React.HTMLAttributes<HTMLSpanElement>,
	HTMLSpanElement
>;

const TextLabel = forwardRef<HTMLSpanElement, TextLabelProps>(
	({ className, ...props }, ref) => {
		return <span {...props} className={cx(styles.textLabel, className)} ref={ref} />;
	},
);

TextLabel.displayName = "TextLabel";

type LabelProps = React.DetailedHTMLProps<
	React.LabelHTMLAttributes<HTMLLabelElement>,
	HTMLLabelElement
>;

const Label = forwardRef<HTMLLabelElement, LabelProps>(({ className, ...props }, ref) => {
	return <label {...props} className={cx(styles.label, className)} ref={ref} />;
});

Label.displayName = "Label";

export { Label, Input, Fieldset, TextLabel };
