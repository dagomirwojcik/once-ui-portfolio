import { NextResponse } from "next/server";
import { fetchPublicOneDriveWorkouts } from "@/lib/onedrive/client";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const payload = await fetchPublicOneDriveWorkouts();

    return NextResponse.json(payload, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      },
    });
  } catch {
    return NextResponse.json(
      {
        configured: false,
        workouts: [],
        fetchedAt: new Date().toISOString(),
        error: "Failed to load workouts from OneDrive.",
      },
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
