import { useCallback, useReducer } from "react";
import { Tab } from "@headlessui/react";
import { Label, Input, TextLabel } from "./ui/input";
import { login, register } from "../lib/graphql";
import { classNames } from "./ui/class-names";
import { useAuthAtom } from "../hooks/useAuth";
import { useRouter } from "next/router";

interface LoginFormState {
  email: string;
  password: string;
  isSubmitting: boolean;
}

type LoginFormAction =
  | {
      type: "email" | "password";
      payload: string;
    }
  | {
      type: "submitting" | "reset";
    };

function reducer(state: LoginFormState, action: LoginFormAction) {
  switch (action.type) {
    case "email":
      return { ...state, email: action.payload };
    case "password":
      return { ...state, password: action.payload };
    case "submitting":
      return { ...state, isSubmitting: true };
    case "reset":
      return { ...state, email: "", password: "", isSubmitting: false };
    default:
      throw new Error("Invalid action type", action);
  }
}

export function LoginForm() {
  const [state, dispatch] = useReducer(reducer, {
    email: "",
    password: "",
    isSubmitting: false,
  });

  const [, updateAtom] = useAuthAtom();

  const router = useRouter();

  const handleSubmit: React.FormEventHandler = useCallback(
    async (event) => {
      if (event) {
        event.preventDefault();
      }

      dispatch({ type: "submitting" });

      await login(state.email, state.password).then((value) => {
        if (value.login.user && value.login.token) {
          updateAtom({
            token: value.login.token,
          });

          router.push("/dashboard");
        }
      });
    },
    [state, dispatch, updateAtom, router]
  );

  const handleChange = useCallback(
    (type: "email" | "password"): React.ChangeEventHandler<HTMLInputElement> => {
      return (event) => dispatch({ type, payload: event.target.value });
    },
    [dispatch]
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="email">
          <TextLabel>Email</TextLabel>
          <Input
            disabled={state.isSubmitting}
            type="email"
            name="email"
            id="email"
            autoComplete="email"
            required
            data-testid="login-email-input"
            value={state.email}
            onChange={handleChange("email")}
          />
        </Label>
      </div>

      <div>
        <Label htmlFor="password">
          <TextLabel>Password</TextLabel>
          <Input
            disabled={state.isSubmitting}
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            data-testid="login-email-input"
            value={state.password}
            onChange={handleChange("password")}
          />
        </Label>
      </div>

      <div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md border border-transparent bg-sky-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2">
          Login
        </button>
      </div>
    </form>
  );
}

export function RegisterForm() {
  const [state, dispatch] = useReducer(reducer, {
    email: "",
    password: "",
    isSubmitting: false,
  });

  const [, updateAtom] = useAuthAtom();

  const router = useRouter();
  const handleSubmit: React.FormEventHandler = useCallback(
    async (event) => {
      if (event) {
        event.preventDefault();
      }

      dispatch({ type: "submitting" });
      await register(state.email, state.password).then((value) => {
        if (value.createUser.user && value.createUser.token) {
          updateAtom({
            token: value.createUser.token,
          });

          router.push("/dashboard");
        }
      });
    },
    [state, dispatch, updateAtom, router]
  );

  const handleChange = useCallback(
    (type: "email" | "password"): React.ChangeEventHandler<HTMLInputElement> => {
      return (event) => dispatch({ type, payload: event.target.value });
    },
    [dispatch]
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="email">
          <TextLabel>Email</TextLabel>
          <Input
            disabled={state.isSubmitting}
            type="email"
            name="email"
            id="email"
            autoComplete="email"
            required
            data-testid="login-email-input"
            value={state.email}
            onChange={handleChange("email")}
          />
        </Label>
      </div>

      <div>
        <Label htmlFor="password">
          <TextLabel>Password</TextLabel>
          <Input
            disabled={state.isSubmitting}
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            data-testid="login-email-input"
            value={state.password}
            onChange={handleChange("password")}
          />
        </Label>
      </div>

      <div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md border border-transparent bg-sky-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2">
          Register
        </button>
      </div>
    </form>
  );
}

function MagicTab({ children }: { children: React.ReactNode }) {
  return (
    <Tab
      className={({ selected }) =>
        classNames(
          "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-sky-700",
          "ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-400 focus:outline-none focus:ring-2",
          selected ? "bg-white shadow" : "text-sky-100 hover:bg-white/[0.12] hover:text-white"
        )
      }>
      {children}
    </Tab>
  );
}

export function AuthenticationTabs() {
  return (
    <Tab.Group as="div">
      <Tab.List className="mb-4 flex space-x-1 rounded-xl bg-sky-900/20 p-1">
        <MagicTab>Login</MagicTab>
        <MagicTab>Register</MagicTab>
      </Tab.List>
      <Tab.Panels className="rounded-md p-4 dark:bg-zinc-800">
        <Tab.Panel>
          <header className="">
            <h2 className="mb-6 text-2xl font-bold dark:text-gray-100">
              Sign in to your account
            </h2>
          </header>
          <LoginForm />
        </Tab.Panel>
        <Tab.Panel>
          <header className="">
            <h2 className="mb-6 text-2xl font-bold dark:text-gray-100">
              Sign up for an account
            </h2>
          </header>
          <RegisterForm />
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
}
