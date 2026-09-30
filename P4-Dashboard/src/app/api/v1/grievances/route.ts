import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("http://127.0.0.1:8001/api/v1/grievances", {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Backend response not ok");
    const data = await res.json();
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to reach backend" },
      { status: 502 }
    );
  }
}