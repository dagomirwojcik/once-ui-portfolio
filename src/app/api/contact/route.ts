import { NextResponse } from "next/server";

type ContactPayload = {
  name: string;
  email: string;
  message: string;
  token: string; // Cloudflare Turnstile token
};

async function verifyTurnstile(token: string, ip?: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    // If no secret is configured, fail closed
    return false;
  }
  try {
    const formData = new FormData();
    formData.append("secret", secret);
    formData.append("response", token);
    if (ip) formData.append("remoteip", ip);

    const result = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: formData,
    });
    const data = (await result.json()) as { success?: boolean };
    return Boolean(data.success);
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  try {
    const ip = (request.headers.get("x-forwarded-for") || "").split(",")[0]?.trim();
    const body = (await request.json()) as Partial<ContactPayload>;

    const name = (body.name || "").toString().trim();
    const email = (body.email || "").toString().trim();
    const message = (body.message || "").toString().trim();
    const token = (body.token || "").toString().trim();

    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required." }, { status: 400 });
    }
    if (message.length > 1000) {
      return NextResponse.json({ error: "Message exceeds 1000 character limit." }, { status: 400 });
    }
    if (!token) {
      return NextResponse.json({ error: "Missing Turnstile token." }, { status: 400 });
    }

    if (!process.env.TURNSTILE_SECRET_KEY?.trim()) {
      console.error("[contact] TURNSTILE_SECRET_KEY is not configured");
      return NextResponse.json(
        { error: "Contact form is not configured on the server." },
        { status: 503 }
      );
    }

    const passed = await verifyTurnstile(token, ip);
    if (!passed) {
      console.error("[contact] Turnstile verification failed");
      return NextResponse.json({ error: "Failed human verification." }, { status: 403 });
    }

    const resendKey = process.env.RESEND_API_KEY?.trim();
    if (!resendKey) {
      if (process.env.NODE_ENV === "production") {
        console.error("[contact] RESEND_API_KEY is not configured");
        return NextResponse.json(
          { error: "Contact form email is not configured on the server." },
          { status: 503 }
        );
      }
      console.info("[contact] submission received (no RESEND_API_KEY configured)", { name, email });
      return NextResponse.json({ ok: true });
    }

    try {
      const subject = `[Contact] ${name}`;
      const to = process.env.CONTACT_TO_EMAIL || process.env.NEXT_PUBLIC_CONTACT_TO_EMAIL || "";
      const from = process.env.CONTACT_FROM_EMAIL || "contact@your-domain.example";
      if (!to) {
        throw new Error("CONTACT_TO_EMAIL not configured");
      }
      const html = `
        <div>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <pre style="white-space:pre-wrap">${message || "(No message provided)"}</pre>
        </div>
      `;
      const emailRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from,
          to,
          subject,
          html,
          reply_to: email,
        }),
      });
      if (!emailRes.ok) {
        const resendError = await emailRes.text().catch(() => "");
        console.error("[contact] Resend failed:", emailRes.status, resendError);
        throw new Error("Resend request failed");
      }
    } catch (err) {
      console.error("[contact] Email delivery error:", err);
      return NextResponse.json({ error: "Failed to send email." }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Unexpected server error." }, { status: 500 });
  }
}


