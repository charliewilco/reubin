import { useRouter } from "next/router";
import { useEffect } from "react";
import * as Fathom from "fathom-client";

export function usePageTracking() {
	const router = useRouter();
	useEffect(() => {
		Fathom.load("MIGXNOZX", {
			includedDomains: ["rebuin.app"],
		});

		router.events.on("routeChangeComplete", (_as, routeProps) => {
			if (!routeProps.shallow) {
				Fathom.trackPageview();
			}
		});

		return () => {
			router.events.off("routeChangeComplete", () => {});
		};
	}, [router]);
}
