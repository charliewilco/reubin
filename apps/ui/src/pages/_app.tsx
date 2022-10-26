import { useEffect } from "react";
import type { AppProps } from "next/app";
import Router from "next/router";
import * as Fathom from "fathom-client";
import { Provider } from "jotai";

import "../components/styles.css";

Router.events.on("routeChangeComplete", (_as, routeProps) => {
  if (!routeProps.shallow) {
    Fathom.trackPageview();
  }
});

export default function RootApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Initialize Fathom when the app loads
    Fathom.load("MIGXNOZX", {
      includedDomains: ["rebuin.app"],
    });
  }, []);

  return (
    <Provider>
      <Component {...pageProps} />
    </Provider>
  );
}
