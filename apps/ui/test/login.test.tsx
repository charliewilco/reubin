import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "jotai";
import { LoginForm } from "../src/components/auth-forms";

describe("Login", () => {
  test("should display 'Login' as the button", () => {
    render(
      <Provider>
        <LoginForm />
      </Provider>
    );
    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  test("validate inputs", async () => {
    render(
      <Provider>
        <LoginForm />
      </Provider>
    );

    const emailInput = screen.getByTestId("login-email-input");
    // const passwordInput = screen.getByTestId("login-password-input");

    await userEvent.type(emailInput, "matt@");

    await userEvent.tab();

    expect(screen.getByText("Invalid email")).toBeInTheDocument();
  });
});
