"use client";

import { Suspense, useCallback } from "react";
import { useTimeout } from "$/hooks/useTimeout";
import { markEntryAsRead } from "$/actions";
import { usePathname } from "next/navigation";

interface MarkAsReadProps {
	id: string;
}

export function NotMarkAsRead(props: MarkAsReadProps) {
	let path = usePathname();
	let cb = useCallback(() => markEntryAsRead(props.id, path), [props.id, path]);

	useTimeout(cb, 1500);

	return null;
}

export function MarkAsRead(props: MarkAsReadProps) {
	return (
		<Suspense fallback={null}>
			<NotMarkAsRead {...props} />
		</Suspense>
	);
}
