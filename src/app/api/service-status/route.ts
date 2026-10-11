import { NextResponse } from "next/server";
import { checkAllServices } from "@/lib/serviceStatus";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const services = await checkAllServices();
    return NextResponse.json(
      { services, checkedAt: new Date().toISOString() },
      { status: 200, headers: { "Content-Type": "application/json" } },
    );
  } catch {
    return NextResponse.json(
      { error: "Failed to check service status." },
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}
