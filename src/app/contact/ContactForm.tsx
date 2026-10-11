"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Script from "next/script";
import { useRouter } from "next/navigation";
import { Column, Heading, Text, Input, Textarea, Feedback, Badge } from "@once-ui-system/core";
import "./contact-form.css";

type TurnstileRenderOptions = {
  sitekey: string;
  theme?: "light" | "dark" | "auto";
  callback?: (token: string) => void;
  "expired-callback"?: () => void;
  "error-callback"?: () => void;
};

declare global {
  interface Window {
    turnstile?: {
      render: (container: string | HTMLElement, options: TurnstileRenderOptions) => string;
      reset: (widgetId?: string) => void;
      remove: (widgetId: string) => void;
    };
  }
}

function safeTurnstileCall(action: (turnstile: NonNullable<Window["turnstile"]>) => void) {
  if (!window.turnstile) return;
  try {
    action(window.turnstile);
  } catch {
    // Widget may already be removed during navigation or Strict Mode remounts.
  }
}

export default function ContactForm() {
  const [turnstileSiteKey, setTurnstileSiteKey] = useState<string | null>(null);
  const [configLoading, setConfigLoading] = useState(true);
  const [turnstileScriptReady, setTurnstileScriptReady] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(10);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileReady, setTurnstileReady] = useState(false);
  const turnstileRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    let cancelled = false;

    fetch("/api/contact/config")
      .then((res) => res.json())
      .then((data: { siteKey?: string | null }) => {
        if (!cancelled) {
          setTurnstileSiteKey(data.siteKey?.trim() || null);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setTurnstileSiteKey(null);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setConfigLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const syncTurnstileToken = useCallback(() => {
    const input = turnstileRef.current?.querySelector(
      'input[name="cf-turnstile-response"]'
    ) as HTMLInputElement | null;
    if (input?.value) {
      setTurnstileToken(input.value);
    }
  }, []);

  const resetTurnstile = useCallback(() => {
    setTurnstileToken("");
    const widgetId = widgetIdRef.current;
    if (!widgetId) return;
    safeTurnstileCall((turnstile) => turnstile.reset(widgetId));
  }, []);

  useEffect(() => {
    if (!turnstileSiteKey || !turnstileScriptReady || !turnstileRef.current) return;

    let cancelled = false;
    const container = turnstileRef.current;

    const renderWidget = () => {
      if (cancelled || !container || !window.turnstile || widgetIdRef.current) return;

      widgetIdRef.current = window.turnstile.render(container, {
        sitekey: turnstileSiteKey,
        theme: "dark",
        callback: (token: string) => setTurnstileToken(token),
        "expired-callback": () => setTurnstileToken(""),
        "error-callback": () => setTurnstileToken(""),
      });
      setTurnstileReady(true);
      syncTurnstileToken();
    };

    if (window.turnstile) {
      renderWidget();
    } else {
      const interval = window.setInterval(() => {
        if (window.turnstile) {
          window.clearInterval(interval);
          renderWidget();
        }
      }, 50);
      return () => window.clearInterval(interval);
    }

    return () => {
      cancelled = true;
      const widgetId = widgetIdRef.current;
      widgetIdRef.current = null;
      setTurnstileReady(false);
      setTurnstileToken("");
      if (widgetId) {
        safeTurnstileCall((turnstile) => turnstile.remove(widgetId));
      }
    };
  }, [turnstileSiteKey, turnstileScriptReady, syncTurnstileToken]);

  useEffect(() => {
    if (!turnstileReady || turnstileToken) return;

    const interval = window.setInterval(syncTurnstileToken, 200);
    return () => window.clearInterval(interval);
  }, [turnstileReady, turnstileToken, syncTurnstileToken]);

  useEffect(() => {
    if (submitted) {
      setCountdown(10);
      const interval = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [submitted]);

  useEffect(() => {
    if (submitted && countdown === 0) {
      router.push("/");
    }
  }, [submitted, countdown, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (e.target.name === "message" && value.length > 1000) {
      return;
    }
    setForm({ ...form, [e.target.name]: value });
  };

  const canSubmit = Boolean(
    form.name.trim() &&
      form.email.trim() &&
      turnstileToken &&
      !isSubmitting
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSubmit) return;

    setError("");
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, token: turnstileToken }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Submission failed. Please try again later.");
      }
      setSubmitted(true);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "An unexpected error occurred. Please try again.";
      setError(message);
      resetTurnstile();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Column maxWidth="s" horizontal="center" gap="m" paddingY="16" style={{ alignItems: "center" }}>
      {turnstileSiteKey && (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
          id="cloudflare-turnstile-script"
          strategy="afterInteractive"
          onLoad={() => setTurnstileScriptReady(true)}
        />
      )}

      {submitted && (
        <>
          <Feedback
            variant="success"
            title="Message sent!"
            description="Thank you for reaching out! I'll get back to you soon."
            style={{
              width: "100%",
              marginBottom: 24,
              borderRadius: "var(--radius-l)",
              border: "2px solid var(--glass-card-border)",
              backdropFilter: "var(--glass-backdrop)",
              WebkitBackdropFilter: "var(--glass-backdrop)",
              opacity: 0.95,
            }}
          />
          <Heading as="h2" variant="display-strong-xs" align="center" marginBottom="xs">
            Redirecting in {countdown} second{countdown !== 1 ? "s" : ""}...
          </Heading>
          <Text align="center" onBackground="neutral-weak" marginBottom="l">
            You will be taken to the homepage shortly.
          </Text>
        </>
      )}

      {error && (
        <>
          <Feedback
            variant="danger"
            title="Submission Failed"
            description={error}
            style={{
              width: "100%",
              marginBottom: 24,
              borderRadius: "var(--radius-l)",
              border: "2px solid var(--glass-card-border)",
              backdropFilter: "var(--glass-backdrop)",
              WebkitBackdropFilter: "var(--glass-backdrop)",
              opacity: 0.95,
            }}
          />
          <div
            style={{
              width: "100%",
              position: "relative",
              borderRadius: "var(--radius-l)",
              border: "2px solid var(--glass-card-border)",
              background: "var(--glass-card-bg)",
              backdropFilter: "var(--glass-backdrop)",
              WebkitBackdropFilter: "var(--glass-backdrop)",
              overflow: "hidden",
              zIndex: "var(--glass-z-index)",
              marginBottom: 24,
            }}
          >
            <Feedback
              variant="info"
              title="Alternative contact"
              description="If this keeps failing, email me directly at dagomir@dagomirwojcik.com."
              style={{
                background: "transparent",
                border: 0,
                borderRadius: 0,
                padding: "16px 20px",
                width: "100%",
                height: "100%",
              }}
            />
          </div>
        </>
      )}

      {configLoading && (
        <Text variant="body-default-s" onBackground="neutral-weak">
          Loading contact form...
        </Text>
      )}

      {!configLoading && !turnstileSiteKey && (
        <Feedback
          variant="warning"
          title="Contact form unavailable"
          description="Turnstile is not configured. Add TURNSTILE_SITE_KEY and TURNSTILE_SECRET_KEY to your hosting environment (Vercel → Settings → Environment Variables)."
          style={{ width: "100%" }}
        />
      )}

      {!submitted && turnstileSiteKey && (
        <form onSubmit={handleSubmit} style={{ width: "100%", maxWidth: 600, margin: "0 auto" }} className="contactForm">
          <Column gap="s">
            <Input
              id="contact-name"
              label="Name (Required)"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <Input
              id="contact-email"
              label="Email (Required)"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <div style={{ width: "100%" }}>
              <Textarea
                id="contact-message"
                label="Message (Optional)"
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Type your message here..."
                lines={7}
                maxLength={1000}
              />
              <Text variant="body-default-xs" onBackground="neutral-weak" style={{ marginTop: 8, textAlign: "right" }}>
                {form.message.length}/1000 characters
              </Text>
            </div>

            <div className="contactForm-turnstileRow">
              <div>
                <div ref={turnstileRef} key={turnstileSiteKey} />
                {!turnstileReady && (
                  <Text variant="body-default-s" onBackground="neutral-weak">
                    Loading verification...
                  </Text>
                )}
              </div>
              <div className="contactForm-submit">
                <button
                  type="submit"
                  disabled={!canSubmit}
                  style={{
                    background: "transparent",
                    border: 0,
                    padding: 0,
                    cursor: canSubmit ? "pointer" : "not-allowed",
                    opacity: canSubmit ? 1 : 0.5,
                  }}
                  aria-disabled={!canSubmit}
                >
                  <Badge
                    background="brand-alpha-weak"
                    onBackground="neutral-strong"
                    paddingX="12"
                    paddingY="8"
                    textVariant="label-default-m"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Badge>
                </button>
              </div>
            </div>
          </Column>
        </form>
      )}
    </Column>
  );
}
