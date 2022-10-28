"use client";

import { Tab } from "@headlessui/react";
import { LoginForm } from "./login-form";
import { RegisterForm } from "./register-form";
import { classNames } from "./ui/class-names";

export function AuthenticationTabs() {
  return (
    <Tab.Group as="div">
      <Tab.List className="mb-4 flex space-x-1 rounded-xl bg-sky-900/20 p-1">
        <Tab
          className={({ selected }) =>
            classNames(
              "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-sky-700",
              "ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-400 focus:outline-none focus:ring-2",
              selected
                ? "bg-white shadow"
                : "text-sky-100 hover:bg-white/[0.12] hover:text-white"
            )
          }>
          Login
        </Tab>
        <Tab
          className={({ selected }) =>
            classNames(
              "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-sky-700",
              "ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-400 focus:outline-none focus:ring-2",
              selected
                ? "bg-white shadow"
                : "text-sky-100 hover:bg-white/[0.12] hover:text-white"
            )
          }>
          Register
        </Tab>
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
