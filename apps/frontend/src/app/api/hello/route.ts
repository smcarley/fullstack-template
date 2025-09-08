import { NextResponse } from "next/server";

export async function GET() {
  const upstream = process.env.BACKEND_URL ?? "http://localhost:4000";
  const res = await fetch(`${upstream}/v1/hello`, { cache: "no-store" });
  const data = await res.json();
  return NextResponse.json(data);
}


