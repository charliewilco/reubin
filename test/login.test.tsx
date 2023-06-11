import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { setupServer } from "msw/node";
import { LoginForm } from "../src/components/login-form";

const loginHandler = jest.fn();

const server = setupServer();

beforeAll(() => server.listen());
afterEach(() => {
	server.resetHandlers();
});
afterAll(() => server.close());

const routerPush = jest.fn();

jest.mock("next/navigation", () => ({
	useRouter() {
		return {
			route: "/",
			pathname: "",
			query: "",
			asPath: "",
			push: routerPush,
			events: {
				on: jest.fn(),
				off: jest.fn(),
			},
			beforePopState: jest.fn(() => null),
			prefetch: jest.fn(() => null),
		};
	},
}));

describe("Login", () => {
	test("should display 'Login' as the button", () => {
		render(<LoginForm />);
		expect(screen.getByText("Login")).toBeInTheDocument();
	});

	test("validate inputs", async () => {
		render(<LoginForm />);

		const emailInput = screen.getByTestId("login-email-input");
		// const passwordInput = screen.getByTestId("login-password-input");

		await act(async () => {
			await userEvent.type(emailInput, "matt@");
			await userEvent.tab();
		});

		expect(screen.getByText("Invalid email")).toBeInTheDocument();
		expect(screen.getByRole("button")).toBeDisabled();
	});

	test("should respond with correct credentials", async () => {
		render(<LoginForm />);

		const emailInput = screen.getByTestId("login-email-input");
		const passwordInput = screen.getByTestId("login-password-input");
		await act(async () => {
			await userEvent.type(emailInput, "matt@test.com");
			await userEvent.type(passwordInput, "P@ssw0rd");
			await userEvent.click(screen.getByRole("button"));
		});

		expect(loginHandler).toBeCalledWith({
			email: "matt@test.com",
			// the encoded version of "P@ssw0rd"
			password: "UEBzc3cwcmQ=",
		});
		expect(routerPush).toHaveBeenCalledWith("/feeds");
	});
});
