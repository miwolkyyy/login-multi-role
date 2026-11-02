"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { loginSchme } from "@/lib/validations/auth-schema";

function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInput = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    const result = loginSchme.safeParse({
      email,
      password,
    });
    if (!result.success) {
      setError(result.error.issues[0]?.message ?? "Input tidak valid");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await signIn("credentials", {
        email: result.data.email,
        password: result.data.password,
        redirect: false,
        callbackUrl: "/user/home",
      });

      if (!response?.ok || response.error) {
        setError("Email atau password salah");
        return;
      }

      router.replace("/user/home");
      router.refresh();
    } catch (error) {
      console.error("Login request failed:", error);
      setError("Tidak dapat menghubungi server. Coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleInput} className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-3 mx-auto">
      <legend className="fieldset-legend">Login</legend>

      <label className="label">Email</label>
      <input value={email} onChange={(e) => setEmail(e.target.value)} name="email" type="email" className="input" placeholder="Email" />

      <label className="label">Password</label>
      <input value={password} onChange={(e) => setPassword(e.target.value)} name="password" type="password" className="input" placeholder="Password" />
      {error && <p className="text-sm text-error">{error}</p>}

      <button type="submit" className="btn btn-neutral mt-4" disabled={isSubmitting}>
        {isSubmitting ? "Memproses..." : "Login"}
      </button>
    </form>
  );
}

export default LoginForm;
