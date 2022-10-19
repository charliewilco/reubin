import { useState } from "react";

const isBrowser = typeof window !== "undefined";

interface CookieOptions {
  days?: number;
  path?: string;
  domain?: string;
  SameSite?: "None" | "Lax" | "Strict";
  Secure?: boolean;
  HttpOnly?: boolean;
}

export function stringifyOptions(options: CookieOptions) {
  const keys = Object.keys(options) as (keyof CookieOptions)[];
  return keys.reduce((acc, key: keyof CookieOptions) => {
    if (key === "days") {
      return acc;
    } else {
      if (options[key] === false) {
        return acc;
      } else if (options[key] === true) {
        return `${acc}; ${key}`;
      } else {
        return `${acc}; ${key}=${options[key]}`;
      }
    }
  }, "");
}

export function setCookie(
  name: string,
  value: string | number | boolean,
  options: CookieOptions
) {
  if (!isBrowser) return;

  const optionsWithDefaults = {
    days: 7,
    path: "/",
    ...options,
  };

  const expires = new Date(Date.now() + optionsWithDefaults.days * 864e5).toUTCString();

  document.cookie =
    name +
    "=" +
    encodeURIComponent(value) +
    "; expires=" +
    expires +
    stringifyOptions(optionsWithDefaults);
}

export function getCookie(name: string, initialValue?: string | number | boolean) {
  return (
    (isBrowser &&
      document.cookie.split("; ").reduce((r, v) => {
        const parts = v.split("=");
        return parts[0] === name ? decodeURIComponent(parts[1]) : r;
      }, "")) ||
    initialValue
  );
}

export function useCookies(key: string, initialValue?: string | number | boolean) {
  const [item, setItem] = useState(() => {
    return getCookie(key, initialValue);
  });

  const updateItem = (value: string | number | boolean, options: CookieOptions) => {
    setItem(value);
    setCookie(key, value, options);
  };

  return [item, updateItem] as const;
}
