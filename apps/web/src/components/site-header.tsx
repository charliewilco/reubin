import Image from "next/image";
import Link from "next/link";
import IconImage from "../../public/app-icon-play-store.png";
import styles from "./site-header.module.css";

export function SiteHeader() {
	return (
		<header id="header" className={styles.header}>
			<Link href="/">
				<Image
					id="icon"
					width={48}
					height={48}
					src={IconImage}
					alt="App icon for Reubin application"
				/>

				<h1>Reubin</h1>
			</Link>
		</header>
	);
}
