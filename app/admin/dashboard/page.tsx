import { requiredAdmin } from "@/lib/auth-guard";

export const instant = false;

export default async function DashboardPage() {
  await requiredAdmin();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <p>Selamat datang di dashboard restaurant.</p>
    </div>
  );
}
