"use client";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();

  if (status === "authenticated") {
    return <p>Signed in as {session.user?.email}</p>;
  }

  return (
    <main className="flex min-h-screen items-center justify-center">
      <h1 className="text-3xl font-bold">Ecommerce App</h1>
    </main>
  );
}
