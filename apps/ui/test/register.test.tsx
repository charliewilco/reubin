import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { graphql } from "msw";
import { setupServer } from "msw/node";
import { RegisterForm } from "../src/components/register-form";
import { AuthToken } from "../src/lib/auth-token";
import { RegisterMutation } from "../src/lib/__generated__";

const registerUserHandler = jest.fn();

const server = setupServer(
  graphql.mutation<RegisterMutation>("Register", (_req, res, ctx) => {
    registerUserHandler(_req.variables);

    return res(
      ctx.data({
        createUser: {
          token: "valid-token",
          user: {
            id: "1",
            email: _req.variables.email,
          },
        },
      })
    );
  })
);

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
    render(<RegisterForm />);
    expect(screen.getByText("Register")).toBeInTheDocument();
  });

  test("validate inputs", async () => {
    render(<RegisterForm />);

    const emailInput = screen.getByTestId("register-email-input");

    await userEvent.type(emailInput, "matt@");

    await userEvent.tab();

    expect(screen.getByText("Invalid email")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeDisabled();
  });

  test("should respond with correct credentials", async () => {
    render(<RegisterForm />);

    const emailInput = screen.getByTestId("register-email-input");
    const passwordInput = screen.getByTestId("register-password-input");
    await userEvent.type(emailInput, "matt@test.com");

    await userEvent.type(passwordInput, "P@ssw0rd");

    await userEvent.click(screen.getByRole("button"));

    expect(registerUserHandler).toBeCalledWith({
      email: "matt@test.com",
      // the encoded version of "P@ssw0rd"
      password: "UEBzc3cwcmQ=",
    });
    expect(routerPush).toHaveBeenCalledWith("/feeds");

    expect(AuthToken.manager.get()).toBe("valid-token");
  });
});
