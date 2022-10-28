import Link from "next/link";
import { CornerDownLeft } from "lucide-react";

export function AltHeader() {
  return (
    <header className="mb-4 border-b py-4 px-2">
      <Link href="/dashboard" className="flex items-center gap-4">
        <CornerDownLeft className="h-4 w-4" />

        <span>Dashboard</span>
      </Link>
    </header>
  );
}
