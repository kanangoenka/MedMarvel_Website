"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { getDashboardRoute } from "@/lib/get-dashboard-route";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  async function handleLogin(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        "/api/auth/login",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data =
        await res.json();

      if (!res.ok) {
        setError(
          data.error ||
            "Login failed"
        );

        setLoading(false);
        return;
      }

      const route =
        getDashboardRoute(
          data.role
        );

      router.push(route);

      router.refresh();

      return;

    } catch (error) {
      console.error(error);

      setError(
        "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F7FAFC]">

      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-xl border border-gray-100">

        <div className="flex flex-col items-center mb-6">

          <Image
            src="/MedMarvelLogo.jpg"
            alt="MedMarvel Logo"
            width={120}
            height={120}
            priority
            className="mb-3"
          />

          <div className="text-center">
  <h1 className="text-4xl font-light tracking-wide text-[#173B67]">
    MEDMARVEL
  </h1>

  <p className="mt-1 text-sm tracking-[0.30em] text-[#2FAFB8] uppercase">
    Software Solutions
  </p>
</div>

        </div>

        <form
          onSubmit={handleLogin}
          className="space-y-4"
        >

          <div>
            <label className="block mb-1 text-sm font-medium">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
              className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#2FAFB8] focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#2FAFB8] focus:border-transparent"
              required
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#173B67] text-white py-2.5 rounded-lg font-medium hover:bg-[#122F53] transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50"
          >
            {loading
              ? "Logging in..."
              : "Login"}
          </button>

        </form>

      </div>

    </div>
  );
}