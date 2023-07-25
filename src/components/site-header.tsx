import Image from "next/image";
import Link from "next/link";
import IconImage from "../../public/app-icon-play-store.png";

export function SiteHeader() {
	return (
		<header id="header" className="mx-auto mt-8 max-w-7xl p-2">
			<Link href="/" className="flex items-center">
				<Image
					id="icon"
					width={48}
					height={48}
					className="mr-4 block"
					src={IconImage}
					alt="App icon for Zaptread application"
				/>

				<h1 className="font-mono text-xl font-light">Zaptread</h1>
			</Link>
		</header>
	);
}
