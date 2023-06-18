import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { AddFeedForm } from "../components/add-feed-form";

xdescribe("AddFeed", () => {
	test("should display 'Add Feed' as the title", () => {
		const fn = jest.fn();
		render(<AddFeedForm onSubmit={fn} />);
		expect(screen.getByText("Submit")).toBeInTheDocument();
	});

	test("Should not fire when the form is empty", async () => {
		const fn = jest.fn();
		render(<AddFeedForm onSubmit={fn}/>);
		const input = screen.getByTestId("add-feed-url");
		const button = screen.getByText("Submit");

		await act(async () => {
			await userEvent.click(button);
		});

		expect(fn).not.toHaveBeenCalled();
		await act(async () => {
			await userEvent.type(input, "https://www.google.com");
		});

		expect(input).toHaveValue("https://www.google.com");

		await act(async () => {
			await userEvent.click(button);
		});
		expect(fn).toHaveBeenCalled();
	});
});
