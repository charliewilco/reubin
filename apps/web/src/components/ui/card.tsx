import { cx } from "class-variance-authority";
import styles from "./card.module.css";

interface CardProps
	extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export function Card({ className, ...props }: CardProps) {
	return <div className={cx(className, styles.card)} {...props} />;
}
