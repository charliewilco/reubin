import { forwardRef } from "react";
import { classNames } from "./class-names";

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const Input = forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
  return (
    <input
      {...props}
      className={classNames(
        "block w-full rounded px-2 py-2 text-sm shadow dark:bg-zinc-700",
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

type LabelProps = React.DetailedHTMLProps<
  React.LabelHTMLAttributes<HTMLLabelElement>,
  HTMLLabelElement
>;

const Label = forwardRef<HTMLLabelElement, LabelProps>(({ className, ...props }, ref) => {
  return <label {...props} className={classNames("text-sm", className)} ref={ref} />;
});

Label.displayName = "Label";

export { Label, Input, Fieldset };
