import { useFormik } from "formik";
import { useState } from "react";
import { addFeed } from "../lib/fetcher";
import { SuperButton, Button } from "./ui/button";
import { Label, Fieldset, Input } from "./ui/input";
import { Dialog } from "./ui/dialog";

interface AddFeedFormProps {
	onSubmit(url: string): void | Promise<void>;
	onSelect?(selectedFeed: unknown): void | Promise<void>;
}

export const AddFeedForm = (props: AddFeedFormProps) => {
	const formik = useFormik({
		initialValues: {
			url: "",
		},
		onSubmit(values) {
			props.onSubmit(values.url);
		},
	});
	return (
		<div>
			<form onSubmit={formik.handleSubmit}>
				<Fieldset>
					<Label htmlFor="name">URL</Label>
					<Input {...formik.getFieldProps("url")} />
				</Fieldset>
				<div style={{ display: "flex", marginTop: 25, justifyContent: "flex-end" }}>
					<SuperButton type="submit">Submit</SuperButton>
				</div>
			</form>
		</div>
	);
};

export const AddFeed = () => {
	const [isOpen, setOpen] = useState(false);
	return (
		<>
			<Button onClick={() => setOpen(true)}>Add Feed</Button>
			<Dialog isOpen={isOpen} onClose={() => setOpen(false)} title="Add Feed">
				<div className="mt-2 mb-8 text-sm opacity-50">
					Make changes to your profile here. Click save when you&apos;re done.
				</div>
				<AddFeedForm onSubmit={addFeed} />
			</Dialog>
		</>
	);
};