"use client";

import { Suspense, useEffect } from "react";

interface MarkAsReadProps {
	id: string;
}

export function _MarkAsRead(props: MarkAsReadProps) {
	useEffect(() => {}, [props.id]);

	return null;
}

export function MarkAsRead(props: MarkAsReadProps) {
	return (
		<Suspense fallback={null}>
			<_MarkAsRead {...props} />
		</Suspense>
	);
}
