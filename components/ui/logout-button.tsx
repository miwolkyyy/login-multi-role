"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button
      onClick={() =>
        signOut({
          redirectTo: "/auth/login",
        })
      }
      className="btn btn-error btn-sm text-white"
    >
      Logout
    </button>
  );
}
