import "../components/styles.css";
import { classNames } from "../components/ui/class-names";

export default function RootLayout({ children }: React.PropsWithChildren<{}>) {
  const className = classNames("dark:bg-zinc-900 dark:text-white");
  return (
    <html className={className}>
      <body>{children}</body>
    </html>
  );
}
