import { AuthenticationTabs } from "../../../components/auth-forms";

export default function LoginPage() {
  return (
    <div className="flex min-h-full">
      <div className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center py-12 px-4 lg:flex-none">
        <AuthenticationTabs />
      </div>
    </div>
  );
}
