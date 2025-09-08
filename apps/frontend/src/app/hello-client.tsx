"use client";

import { useState } from "react";

export default function HelloClient() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function callApi() {
    setLoading(true);
    setError(null);
    setMessage(null);
    try {
      const res = await fetch("/api/hello", { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setMessage(data.message ?? JSON.stringify(data));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <button
        className="rounded-md border px-4 py-2"
        onClick={callApi}
        disabled={loading}
      >
        {loading ? "Calling…" : "Call /api/hello"}
      </button>
      {message && <p className="text-green-600">Message: {message}</p>}
      {error && <p className="text-red-600">Error: {error}</p>}
    </div>
  );
}


