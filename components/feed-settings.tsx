import { Button } from "./ui/button";
import { Dialog } from "./ui/dialog";
import { useCallback, useState } from "react";
import { FiSettings, FiTrash2 } from "react-icons/fi";
import { removeFeed, updateFeedTitle } from "../lib/fetcher";
import { useFormik } from "formik";
import { Input } from "./ui/input";
import { useDashboardContext } from "../hooks/useDashboard";

export const UpdateFeedForm = (props: { onClose(): void }) => {
	const [{ feed }, { unselectFeed }] = useDashboardContext();
	const handleRemove = useCallback(() => {
		if (feed) {
			try {
				removeFeed(feed.id).then(() => {
					props.onClose();
					unselectFeed();
				});
			} catch (error) {}
		}
	}, [feed, props, unselectFeed]);

	const formik = useFormik({
		initialValues: {
			title: feed?.title ?? "",
		},

		onSubmit(values) {
			if (feed) {
				updateFeedTitle(values.title, feed.id);
			}
		},
	});
	return (
		<form onSubmit={formik.handleSubmit}>
			<div>
				<Input {...formik.getFieldProps("title")} />
			</div>
			<div className="flex justify-between">
				<div className="block text-red-500">
					<Button
						type="button"
						aria-label="Remove Feed"
						className="inline-flex items-center"
						onClick={handleRemove}>
						<FiTrash2 />
						<span className="ml-2">Unsubscribe</span>
					</Button>
				</div>

				<Button
					type="submit"
					aria-label="Remove Feed"
					className="inline-flex items-center"
					onClick={handleRemove}>
					<span className="ml-2">Save</span>
				</Button>
			</div>
		</form>
	);
};

export const FeedSettings = () => {
	const [isOpen, setOpen] = useState(false);
	const handleClose = () => setOpen(false);
	const handleOpen = () => setOpen(true);

	const [{ feed }] = useDashboardContext();

	return (
		<>
			<Button aria-label="Update feed" onClick={handleOpen}>
				<FiSettings />
			</Button>
			<Dialog isOpen={isOpen} onClose={handleClose} title={`Update feed "${feed?.title}"`}>
				<UpdateFeedForm onClose={handleClose} />
			</Dialog>
		</>
	);
};
