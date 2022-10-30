import { LoginForm } from "../../../components/login-form";

export default function LoginPage() {
	return (
		<div>
			<header className="">
				<h2 className="mb-6 text-2xl font-bold dark:text-gray-100">Sign in to your account</h2>
			</header>

			<LoginForm />
		</div>
	);
}
