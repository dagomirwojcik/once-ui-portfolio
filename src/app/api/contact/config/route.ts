import { NextResponse } from "next/server";

const TURNSTILE_TEST_SITE_KEY = "1x00000000000000000000AA";

export async function GET() {
  const siteKey =
    process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim() ||
    process.env.TURNSTILE_SITE_KEY?.trim() ||
    (process.env.NODE_ENV === "development" ? TURNSTILE_TEST_SITE_KEY : null);

  return NextResponse.json({
    siteKey,
    isTestKey: siteKey === TURNSTILE_TEST_SITE_KEY,
  });
}
