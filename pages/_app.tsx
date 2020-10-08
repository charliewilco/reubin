import { useEffect } from "react";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import * as Fathom from "fathom-client";
import "../styles/index.css";

export default function RootApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    // Initialize Fathom when the app loads
    Fathom.load("MIGXNOZX", {
      includedDomains: ["rebuin.app", "pre-alpha.reubin.app"],
    });

    function onRouteChangeComplete() {
      Fathom.trackPageview();
    }
    // Record a pageview when route changes
    router.events.on("routeChangeComplete", onRouteChangeComplete);

    // Unassign event listener
    return () => {
      router.events.off("routeChangeComplete", onRouteChangeComplete);
    };
  }, []);

  return <Component {...pageProps} />;
}
