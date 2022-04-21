import { useEffect } from "react";
import { AppProps } from "next/app";
import Router from "next/router";
import * as Fathom from "fathom-client";
import "../components/styles.css";

Router.events.on("routeChangeComplete", () => {
  Fathom.trackPageview();
});

export default function RootApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Initialize Fathom when the app loads
    Fathom.load("MIGXNOZX", {
      includedDomains: ["rebuin.app", "pre-alpha.reubin.app"],
    });
  }, []);

  return <Component {...pageProps} />;
}
