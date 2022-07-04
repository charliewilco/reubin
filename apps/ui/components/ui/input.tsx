import { styled } from "@stitches/react";
import { blue } from "@radix-ui/colors";

export const Input = styled("input", {
	all: "unset",
	width: "100%",
	flex: "1",
	display: "inline-flex",
	alignItems: "center",
	justifyContent: "center",
	borderRadius: 4,
	padding: "0 10px",
	fontSize: 15,
	lineHeight: 1,
	boxShadow: `0 0 0 1px ${blue.blue7}`,
	height: 35,

	"&:focus": { boxShadow: `0 0 0 2px ${blue.blue8}` },
});

export const Fieldset = styled("fieldset", {
	all: "unset",
	display: "flex",
	gap: 20,
	alignItems: "center",
	marginBottom: 15,
});

export const Label = styled("label", {
	fontSize: 15,
	width: 90,
	textAlign: "right",
});
