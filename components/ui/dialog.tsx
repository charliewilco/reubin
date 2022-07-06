import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Button, IconButton } from "./button";

interface DialogProps {
	title: string;
	description: string;
	children?: React.ReactNode;
}
export const Dialog = (props: DialogProps) => {
	return (
		<DialogPrimitive.Root>
			<DialogPrimitive.Trigger asChild>
				<Button>Add Feed</Button>
			</DialogPrimitive.Trigger>
			<DialogPrimitive.Portal>
				<DialogPrimitive.Overlay className="fixed inset-0 bg-zinc-900 opacity-50" />
				<DialogPrimitive.Content className="fixed top-1/2 left-1/2 max-h-[85vh] w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-sm bg-zinc-900 p-4 shadow-lg">
					<DialogPrimitive.Title className="text-xl font-semibold">
						{props.title}
					</DialogPrimitive.Title>
					<DialogPrimitive.Description className="mt-2 mb-8 text-sm opacity-50">
						{props.description}
					</DialogPrimitive.Description>
					{props.children}

					<DialogPrimitive.Close asChild>
						<IconButton aria-label="Close">
							<Cross2Icon />
						</IconButton>
					</DialogPrimitive.Close>
				</DialogPrimitive.Content>
			</DialogPrimitive.Portal>
		</DialogPrimitive.Root>
	);
};
