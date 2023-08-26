import type { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

export type CookiesFn = () => ReadonlyRequestCookies;
