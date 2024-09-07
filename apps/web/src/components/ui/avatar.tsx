import styles from "./avatar.module.css";

interface AvatarProps {
	username: string;
}

export function Avatar({ username }: AvatarProps) {
	return (
		<div className={styles.container}>
			<object className={styles.avatar} title={username} />
			<div className="sr-only">
				<p>{username}</p>
			</div>
		</div>
	);
}
