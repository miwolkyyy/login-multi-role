import { auth } from "./auth";
import { redirect } from "next/navigation";

export const requiredAdmin = async () => {
  const session = await auth();
  if (!session?.user) {
    redirect("/auth/login");
  }
  if (session.user.role !== "ADMIN") {
    redirect("/home");
  }
  return session;
};

export async function requireUser() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/login");
  }

  return session;
}
