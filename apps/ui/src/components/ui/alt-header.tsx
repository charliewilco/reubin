import Link from "next/link";
import { CornerDownLeft } from "lucide-react";

export function AltHeader() {
  return (
    <header className="mb-4 border-b py-4">
      <Link href="/dashboard">
        <a className="flex items-center gap-4">
          <CornerDownLeft />

          <span>Dashboard</span>
        </a>
      </Link>
    </header>
  );
}
