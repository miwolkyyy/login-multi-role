import LoginForm from "@/components/ui/loginForm";
import React from "react";

function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-base-200 p-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <h1 className="text-center text-3xl font-bold">Restaurant Login</h1>

          <p className="text-center text-base-content/60">Login untuk melanjutkan</p>
          <LoginForm />
        </div>
      </div>
    </main>
  );
}

export default LoginPage;
