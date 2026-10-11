import { NextResponse } from "next/server";
import { fetchFoldingAtHomeDonor } from "@/lib/foldingathome/client";
import type { FoldingAtHomeStatsResponse } from "@/lib/foldingathome/types";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const donor = await fetchFoldingAtHomeDonor();
    const payload: FoldingAtHomeStatsResponse = {
      configured: true,
      donor,
      fetchedAt: new Date().toISOString(),
    };

    return NextResponse.json(payload, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
      },
    });
  } catch {
    const payload: FoldingAtHomeStatsResponse = {
      configured: false,
      donor: null,
      fetchedAt: new Date().toISOString(),
      error: "Failed to load Folding@home stats.",
    };

    return NextResponse.json(payload, {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
