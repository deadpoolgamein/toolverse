"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldAlert, KeyRound } from "lucide-react";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Hum password check karne ke liye ek secure internal API banayenge
    try {
      const res = await fetch("/api/admin-auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        // Success: Middleware browser cookie check karke access de dega
        router.push("/admin-panel");
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.message || "ACCESS DENIED: INVALID DECRYPTION KEY");
      }
    } catch (err) {
      setError("NETWORK ERROR: MATRIX ACCESS TIMEOUT");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-white flex items-center justify-center px-4 font-sans relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md bg-zinc-900/20 border border-zinc-900 rounded-3xl p-6 sm:p-8 backdrop-blur-md space-y-6 relative z-10 shadow-2xl">
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 bg-red-500/5 border border-red-500/10 rounded-2xl text-red-500 mb-2">
            <ShieldAlert className="w-6 h-6 animate-pulse" />
          </div>
          <h1 className="text-xl font-black tracking-tight tracking-wider font-mono">GATEWAY SECURITY</h1>
          <p className="text-xs text-zinc-500 font-mono uppercase tracking-widest">Authorized Administration Personnel Only</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-1.5">
              <KeyRound className="w-3.5 h-3.5 text-zinc-500" />
              <span>Enter Access Token / Password</span>
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••••••"
              disabled={isLoading}
              className="w-full bg-zinc-950 border border-zinc-800 focus:border-red-500/50 rounded-xl px-4 py-3 text-sm text-zinc-200 outline-none transition-all font-mono tracking-widest"
            />
          </div>

          {error && (
            <div className="p-3 bg-red-500/5 border border-red-500/10 rounded-xl font-mono text-[11px] text-red-400 text-center uppercase tracking-wide">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-zinc-100 hover:bg-zinc-200 disabled:bg-zinc-800 disabled:text-zinc-600 text-zinc-950 font-mono text-xs font-black tracking-widest py-3.5 px-6 rounded-xl transition-all active:scale-[0.99]"
          >
            {isLoading ? "VERIFYING CRYPTO TOKEN..." : "AUTHENTICATE CORE"}
          </button>
        </form>
      </div>
    </main>
  );
}