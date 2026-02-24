"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff } from "lucide-react"

function YinYangLogo({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <circle cx="24" cy="24" r="23" stroke="#276220" strokeWidth="2" />
      <path
        d="M24 1C11.3 1 1 11.3 1 24s10.3 23 23 23c0-12.7-10.3-23-23-23S24 13.7 24 1z"
        fill="#276220"
      />
      <circle cx="24" cy="12.5" r="3" fill="#ffffff" />
      <circle cx="24" cy="35.5" r="3" fill="#276220" />
    </svg>
  )
}

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    if (!email || !password) {
      setError("Please enter your email and password.")
      return
    }
    setLoading(true)
    setTimeout(() => {
      router.push("/")
    }, 800)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#fafafa] px-4">
      <div className="w-full max-w-sm">
        {/* Logo & Title */}
        <div className="flex flex-col items-center gap-3">
          <YinYangLogo size={56} />
          <h1 className="text-2xl font-bold tracking-tight text-[#111827]">MaiSync</h1>
          <p className="text-center text-sm leading-relaxed text-[#676767]">
            Integrative TCM Health Companion
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="mt-8 flex flex-col gap-4">
          <div>
            <label htmlFor="email" className="mb-1.5 block text-xs font-medium text-[#111827]">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-xl border border-[#e1e3e8] bg-[#ffffff] px-4 py-3 text-sm text-[#111827] outline-none transition-colors placeholder:text-[#bababa] focus:border-[#46913c] focus:ring-2 focus:ring-[#46913c]/20"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-1.5 block text-xs font-medium text-[#111827]">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full rounded-xl border border-[#e1e3e8] bg-[#ffffff] px-4 py-3 pr-11 text-sm text-[#111827] outline-none transition-colors placeholder:text-[#bababa] focus:border-[#46913c] focus:ring-2 focus:ring-[#46913c]/20"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#bababa] hover:text-[#676767]"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-xs text-[#ce0000]">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 flex items-center justify-center rounded-xl bg-[#276220] px-4 py-3 text-sm font-semibold text-[#ffffff] transition-colors hover:bg-[#46913c] disabled:opacity-60"
          >
            {loading ? (
              <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="opacity-25" />
                <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="opacity-75" />
              </svg>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        {/* Continue as Guest */}
        <button
          onClick={() => router.push("/")}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-[#e1e3e8] bg-[#ffffff] px-4 py-3 text-sm font-medium text-[#111827] transition-colors hover:bg-[#fafafa]"
        >
          Continue as Guest
        </button>

        <p className="mt-6 text-center text-xs text-[#bababa]">
          {"Don't have an account? "}
          <button
            type="button"
            onClick={() => router.push("/signup")}
            className="font-medium text-[#276220] hover:underline"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  )
}
