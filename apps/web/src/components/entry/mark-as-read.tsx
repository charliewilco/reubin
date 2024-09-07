"use client";

import { markEntryAsRead } from "$/app/actions";
import { useTimeout } from "$/hooks/useTimeout";
import { usePathname } from "next/navigation";
import { Suspense, useCallback } from "react";

interface MarkAsReadProps {
	id: string;
}

export function NotMarkAsRead({ id }: MarkAsReadProps) {
	let path = usePathname();
	let cb = useCallback(() => markEntryAsRead(id, path), [id, path]);

	useTimeout(cb, 1500);

	return null;
}

export function MarkAsRead({ id }: MarkAsReadProps) {
	return (
		<Suspense fallback={null}>
			<NotMarkAsRead id={id} />
		</Suspense>
	);
}
