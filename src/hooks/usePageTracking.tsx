"use client";
import { Suspense } from "react";
import { load, trackPageview } from "fathom-client";
import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

function usePageTracking() {
	let pathname = usePathname();
	let searchParams = useSearchParams();

	useEffect(() => {
		load("MIGXNOZX", {
			includedDomains: ["rebuin.app"],
		});
	}, []);

	useEffect(() => {
		trackPageview();
	}, [pathname, searchParams]);
}

export function TrackingPixel() {
	usePageTracking();
	return null;
}

export function SafeTracking() {
	return (
		<Suspense fallback={null}>
			<TrackingPixel />
		</Suspense>
	);
}
