import { styled } from "@stitches/react";
import { blackA, mauve, green, blue } from "@radix-ui/colors";
import { classNames } from "./class-names";
import { forwardRef } from "react";

const Button = forwardRef<
  HTMLButtonElement,
  React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
>((props, ref) => {
  return <button {...props} ref={ref} />;
});

Button.displayName = "UIButton";

const IconButton = forwardRef<
  HTMLButtonElement,
  React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
>((props, ref) => {
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

export const SuperButton = styled("button", {
  all: "unset",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 4,
  padding: "0 15px",
  fontSize: 15,
  lineHeight: 1,
  fontWeight: 500,
  height: 35,

  variants: {
    variant: {
      violet: {
        backgroundColor: "white",
        color: blue.blue11,
        boxShadow: `0 2px 10px ${blackA.blackA7}`,
        "&:hover": { backgroundColor: mauve.mauve3 },
        "&:focus": { boxShadow: `0 0 0 2px black` },
      },
      green: {
        backgroundColor: green.green4,
        color: green.green11,
        "&:hover": { backgroundColor: green.green5 },
        "&:focus": { boxShadow: `0 0 0 2px ${green.green7}` },
      },
      default: {
        backgroundColor: blue.blue4,
        color: blue.blue11,
        "&:hover": { backgroundColor: blue.blue5 },
        "&:focus": { boxShadow: `0 0 0 2px ${blue.blue7}` },
      },
    },
  },

  defaultVariants: {
    variant: "default",
  },
});

export { Button, IconButton };
