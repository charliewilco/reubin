import { getUserSession } from "$/lib/controllers/session";
import { LogoSmall } from "./logo";
import styles from "./app-header.module.css";
import { Avatar } from "./ui/avatar";

interface AppHeaderProps {
	title?: string;
	children?: React.ReactNode;
}

export async function AppHeader(props: AppHeaderProps) {
	const result = await getUserSession();
	const username = result?.user?.username;
	return (
		<header className={styles.header}>
			<div className={styles.container}>
				<div className={styles.logoContainer}>
					<LogoSmall />
					{props.title && <h1>{props.title}</h1>}
				</div>

				<div>
					<div className={styles.utilityContainer}>
						{props.children}
						{username ? <Avatar username={username} /> : null}
					</div>
				</div>
			</div>
		</header>
	);
}
