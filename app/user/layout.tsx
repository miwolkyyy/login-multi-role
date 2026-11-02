import { auth } from "@/lib/auth";
import UserNavbar from "@/components/userNavbar";
import AdminNavbar from "@/components/AdminNavbar";
import { cacheLife } from "next/cache";
import { Suspense } from "react";

async function getSession() {
  "use cache: private";
  cacheLife({ stale: 30 });
  return auth();
}

async function UserNavigation() {
  const sessin = await getSession();

  return sessin?.user?.role === "ADMIN" ? <AdminNavbar /> : <UserNavbar />;
}

function layout({ children }: LayoutProps<"/user">) {
  return (
    <div>
      <Suspense fallback={<nav aria-busy="true">Memuat navigasi...</nav>}>
        <UserNavigation />
      </Suspense>
      <main>
        hallo
        {children}
      </main>
    </div>
  );
}

export default layout;
