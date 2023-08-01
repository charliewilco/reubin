import { redirect } from "next/navigation";
import { LogoDisplay } from "$/components/logo";
import { Controllers } from "$/lib/controllers";

export default async function Layout({ children }: React.PropsWithChildren<{}>) {
	const { session } = await Controllers.session.getUserSession();
	if (session) redirect("/all");

	return (
		<div className="px-2 py-16">
			<div className="mb-4 flex justify-center">
				<LogoDisplay />
			</div>
			<div className="mx-auto max-w-md">{children}</div>
		</div>
	);
}
