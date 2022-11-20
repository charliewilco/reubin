import { RegisterForm } from "../../../components/register-form";

export default function RegistrationPage() {
	return (
		<div>
			<header className="">
				<h2 className="mb-6 text-2xl font-bold dark:text-gray-100">Sign up for an account</h2>
			</header>
			<RegisterForm />
		</div>
	);
}
