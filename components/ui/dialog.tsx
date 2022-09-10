import { Button } from "./button";
import { Dialog as _Dialog } from "@headlessui/react";
import { FiX } from "react-icons/fi";

interface DialogProps {
	title: string;
	children?: React.ReactNode;
	isOpen: boolean;
	onClose(): void;
}

export const Dialog = ({ children, isOpen, onClose, title }: DialogProps) => {
	return (
		<_Dialog open={isOpen} onClose={onClose}>
			<div className="fixed inset-0 bg-zinc-900 opacity-50" aria-hidden="true" />
			<_Dialog.Panel className="fixed top-1/2 left-1/2 max-h-[85vh] w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-sm bg-white p-4 shadow-lg dark:bg-zinc-900">
				<_Dialog.Title className="text-xl font-semibold">{title}</_Dialog.Title>
				{children}
				<Button className="absolute top-0 right-0 p-2" aria-label="Close" onClick={onClose}>
					<FiX />
				</Button>
			</_Dialog.Panel>
		</_Dialog>
	);
};
