"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface LinkItemProps {
	href: string;
	children: React.ReactNode;
	className?: string;
}

export function ActiveLinkItem(props: LinkItemProps) {
	let pathName = usePathname();
	let isActive = pathName === props.href;

	return (
		<Link href={props.href} aria-current={isActive && "page"} className={props.className}>
			{props.children}
		</Link>
	);
}
