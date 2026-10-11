import { NextResponse } from "next/server";

async function verifyTurnstile(token: string, ip?: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY?.trim();
  if (!secret) return false;

  try {
    const formData = new FormData();
    formData.append("secret", secret);
    formData.append("response", token);
    if (ip) formData.append("remoteip", ip);

    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: formData,
    });
    const data = (await response.json()) as { success?: boolean };
    return Boolean(data.success);
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { token?: string };
    const token = body.token?.trim() || "";
    if (!token) {
      return NextResponse.json({ error: "Missing Turnstile token." }, { status: 400 });
    }

    const ip = (request.headers.get("x-forwarded-for") || "").split(",")[0]?.trim();
    const passed = await verifyTurnstile(token, ip);
    if (!passed) {
      return NextResponse.json({ error: "Failed human verification." }, { status: 403 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Unexpected server error." }, { status: 500 });
  }
}