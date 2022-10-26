import { useRouter } from "next/router";
import { Tab } from "@headlessui/react";
import z from "zod";
import { Label, Input, TextLabel } from "./ui/input";
import { login, register } from "../lib/graphql";
import { classNames } from "./ui/class-names";
import { useAuthAtom } from "../hooks/useAuth";
import { useForm } from "./ui/forms/core";

const validationSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8),
});

export function LoginForm() {
  const [, updateAtom] = useAuthAtom();
  const router = useRouter();
  const { errors, isSubmitting, getFieldProps, getFormProps, getErrorProps } = useForm(
    {
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema,
      onSubmit(values) {
        login(values.email, values.password).then(({ login: { user, token } }) => {
          if (user && token) {
            updateAtom({ token });
            router.push("/dashboard");
          }
        });
      },
    },
    {
      validateOnEvent: "blur",
    }
  );

  return (
    <form {...getFormProps()} className="space-y-6">
      <div>
        <Label htmlFor="email">
          <TextLabel>Email</TextLabel>
          <Input
            disabled={isSubmitting}
            type="email"
            id="email"
            autoComplete="email"
            required
            data-testid="login-email-input"
            {...getFieldProps("email")}
          />
          {errors["email"] && <div {...getErrorProps("email")}>{errors["email"]}</div>}
        </Label>
      </div>

      <div>
        <Label htmlFor="password">
          <TextLabel>Password</TextLabel>
          <Input
            disabled={isSubmitting}
            id="password"
            type="password"
            autoComplete="current-password"
            required
            data-testid="login-password-input"
            {...getFieldProps("password")}
          />
          {errors["password"] && (
            <div {...getErrorProps("password")}>{errors["password"]}</div>
          )}
        </Label>
      </div>

      <div>
        <button
          type="submit"
          disabled={isSubmitting || Object.keys(errors).length > 0}
          className="flex w-full justify-center rounded-md border border-transparent bg-sky-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2">
          Login
        </button>
      </div>
    </form>
  );
}

export function RegisterForm() {
  const [, updateAtom] = useAuthAtom();
  const router = useRouter();
  const { errors, isSubmitting, getFieldProps, getFormProps, getErrorProps } = useForm(
    {
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema,
      onSubmit(values) {
        register(values.email, values.password).then((value) => {
          if (value.createUser.user && value.createUser.token) {
            updateAtom({
              token: value.createUser.token,
            });

            router.push("/dashboard");
          }
        });
      },
    },
    {
      validateOnEvent: "blur",
    }
  );

  return (
    <form {...getFormProps()} className="space-y-6">
      <div>
        <Label htmlFor="email">
          <TextLabel>Email</TextLabel>
          <Input
            disabled={isSubmitting}
            type="email"
            id="email"
            autoComplete="email"
            required
            data-testid="login-email-input"
            {...getFieldProps("email")}
          />
          {errors["email"] && <div {...getErrorProps("email")}>{errors["email"]}</div>}
        </Label>
      </div>

      <div>
        <Label htmlFor="password">
          <TextLabel>Password</TextLabel>
          <Input
            disabled={isSubmitting}
            id="password"
            type="password"
            autoComplete="current-password"
            required
            data-testid="login-email-input"
            {...getFieldProps("password")}
          />
          {errors["password"] && (
            <div {...getErrorProps("password")}>{errors["password"]}</div>
          )}
        </Label>
      </div>

      <div>
        <button
          disabled={isSubmitting}
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
