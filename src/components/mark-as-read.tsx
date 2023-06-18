"use client";

import { useTimeout } from "$/hooks/useTimeout";
import { Suspense, useCallback, useEffect } from "react";

interface MarkAsReadProps {
	id: string;
}

async function markAsRead(id: string) {
	let response = await fetch(`/api/entry/${id}`, {
		method: "PUT",
	});

	if (response.ok) {
		return response.json();
	} else {
		throw new Error("Failed to mark entry as read");
	}
}
export function _MarkAsRead(props: MarkAsReadProps) {
	let callback = useCallback(() => markAsRead(props.id), [props.id]);

	useTimeout(callback, 1500);

	return null;
}

export function MarkAsRead(props: MarkAsReadProps) {
	return (
		<Suspense fallback={null}>
			<_MarkAsRead {...props} />
		</Suspense>
	);
}
