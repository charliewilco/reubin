import { forwardRef } from "react";
import { classNames } from "./class-names";

type InputProps = React.DetailedHTMLProps<
	React.InputHTMLAttributes<HTMLInputElement>,
	HTMLInputElement
>;

// className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"

const Input = forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
	return (
		<input
			{...props}
			className={classNames(
				"block w-full rounded-md border-zinc-200 px-2 py-2 text-sm shadow focus:border-sky-500 focus:ring-sky-500 dark:bg-zinc-700",
				className
			)}
			ref={ref}
		/>
	);
});

Input.displayName = "Input";

type FieldsetProps = React.DetailedHTMLProps<
	React.FieldsetHTMLAttributes<HTMLFieldSetElement>,
	HTMLFieldSetElement
>;

const Fieldset = forwardRef<HTMLFieldSetElement, FieldsetProps>(
	({ className, ...props }, ref) => {
		return (
			<fieldset
				{...props}
				className={classNames("mb-8 flex items-center gap-4", className)}
				ref={ref}
			/>
		);
	}
);

Fieldset.displayName = "Fieldset";

type TextLabelProps = React.DetailedHTMLProps<
	React.HTMLAttributes<HTMLSpanElement>,
	HTMLSpanElement
>;

const TextLabel = forwardRef<HTMLSpanElement, TextLabelProps>(
	({ className, ...props }, ref) => {
		return (
			<span {...props} className={classNames("block pb-2 text-sm", className)} ref={ref} />
		);
	}
);

TextLabel.displayName = "TextLabel";

type LabelProps = React.DetailedHTMLProps<
	React.LabelHTMLAttributes<HTMLLabelElement>,
	HTMLLabelElement
>;

const Label = forwardRef<HTMLLabelElement, LabelProps>(({ className, ...props }, ref) => {
	return <label {...props} className={classNames("block", className)} ref={ref} />;
});

Label.displayName = "Label";

export { Label, Input, Fieldset, TextLabel };
