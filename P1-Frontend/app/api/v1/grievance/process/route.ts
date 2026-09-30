import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const backendResponse = await fetch("http://127.0.0.1:8001/api/v1/grievance/process", {
      method: "POST",
      body: formData,
      // Prevents Node.js fetch from timing out prematurely
      cache: "no-store",
    });

    const data = await backendResponse.json();

    return NextResponse.json(data, { status: backendResponse.status });
  } catch (error: any) {
    return NextResponse.json(
      { detail: error.message || "Failed to reach backend orchestrator" },
      { status: 502 }
    );
  }
}