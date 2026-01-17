// pages/login.js
"use client"; // Required if using App Router
import { ReactHTMLElement, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation"; // or 'next/navigation' for App Router

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false, // Don't redirect automatically
    });

    if (result?.error) {
      setError("Invalid username or password");
    } else {
      router.push("/"); // Redirect manually
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Sign In</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Username"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Sign In</button>
    </form>
  );
}
