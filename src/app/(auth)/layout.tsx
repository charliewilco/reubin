import { LogoDisplay } from "../../components/logo";

export default function Layout({ children }: React.PropsWithChildren<{}>) {
	return (
		<div className="py-16 px-2">
			<div className="mb-4 flex justify-center">
				<LogoDisplay />
			</div>
			<div className="mx-auto max-w-md">{children}</div>
		</div>
	);
}
