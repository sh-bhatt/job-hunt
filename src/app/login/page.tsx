//@ts-nocheck
"use client"
import Link from "next/link"
import { FormEvent, useState } from "react"
import { useRouter } from "next/navigation"

export default function Signin() {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [error, setError] = useState<string>("")
  const router = useRouter();

  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    setError("")

    const res = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      body: JSON.stringify({ email, password })
    })

    const data = await res.json();

    if (data.success) {
      alert("Logged in successfully!");
      router.push("/")
    } else {
      setError(data.error || "Login failed");
    }
  }

  return (
    <div className="flex h-screen w-full items-center justify-center bg-black text-white">
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 border border-white rounded-md shadow-xl w-full max-w-md">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-6 text-center text-2xl font-bold tracking-tight text-white">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white">
                Email address
              </label>
              <div className="mt-2">
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md bg-white px-3 py-2 text-black outline-none focus:ring-2 focus:ring-white"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-white">
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-white hover:underline">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white px-3 py-2 text-black outline-none focus:ring-2 focus:ring-white"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-black shadow-sm hover:bg-gray-300 transition"
              >
                Sign in
              </button>
            </div>
          </form>

          {error && <p className="mt-4 text-red-400 text-center">{error}</p>}

          <p className="mt-10 text-center text-sm text-gray-400">
            Don't have an account?{" "}
            <Link href="/signUp" className="font-semibold text-white hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
