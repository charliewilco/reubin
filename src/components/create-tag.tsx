"use client";
import { useCallback, useReducer } from "react";
import { SuperButton } from "./ui/button";
import { Label, Input, TextLabel } from "./ui/input";

interface CreateTagFormState {
	tag: string;
	isSubmitting: boolean;
}

type CreateTagAction =
	| {
			type: "updateTag";
			tag: string;
	  }
	| {
			type: "submit";
	  }
	| {
			type: "success";
	  };

function reducer(state: CreateTagFormState, action: CreateTagAction): CreateTagFormState {
	switch (action.type) {
		case "updateTag":
			return {
				...state,
				tag: action.tag,
			};
		case "submit":
			return {
				...state,
				isSubmitting: true,
			};
		case "success":
			return {
				tag: "",
				isSubmitting: false,
			};
		default:
			return state;
	}
}

export function CreateTagForm() {
	const [state, dispatch] = useReducer(reducer, {
		tag: "",
		isSubmitting: false,
	});

	const addTag = useCallback(async (_name: string) => {}, []);

	const handleSubmit: React.FormEventHandler = useCallback(
		async (event) => {
			if (event) {
				event.preventDefault();
			}

			if (state.tag === "") {
				return;
			}

			dispatch({ type: "submit" });

			await addTag(state.tag).then(() => {
				dispatch({ type: "success" });
			});
		},
		[state, addTag]
	);

	const handleChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
		(event) => {
			dispatch({ type: "updateTag", tag: event.target.value });
		},
		[dispatch]
	);

	return (
		<form onSubmit={handleSubmit}>
			<Label htmlFor="tag">
				<TextLabel>New Tag</TextLabel>

				<Input
					disabled={state.isSubmitting}
					name="tag"
					id="tag"
					data-testid="add-tag-input"
					value={state.tag}
					onChange={handleChange}
				/>
			</Label>

			<div className="mt-8 flex justify-end">
				<SuperButton disabled={state.isSubmitting} type="submit">
					Submit
				</SuperButton>
			</div>
		</form>
	);
}
