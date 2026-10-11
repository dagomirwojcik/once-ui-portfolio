"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { Dialog } from "@once-ui-system/core";
import MaintenanceBanner from "../MaintenanceBanner";

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

interface CVDownloadBannerProps {
  className?: string;
  style?: React.CSSProperties;
}

export default function CVDownloadBanner({
  className,
  style
}: CVDownloadBannerProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [siteKey, setSiteKey] = useState<string | null>(null);
  const [scriptReady, setScriptReady] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState("");
  const turnstileRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/contact/config")
      .then((response) => response.json())
      .then((data: { siteKey?: string | null }) => {
        if (!cancelled) setSiteKey(data.siteKey?.trim() || null);
      })
      .catch(() => {
        if (!cancelled) setSiteKey(null);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!isDialogOpen || !siteKey || !scriptReady) return;

    let cancelled = false;
    const renderWidget = () => {
      if (cancelled || widgetIdRef.current || !turnstileRef.current || !window.turnstile) return;

      widgetIdRef.current = window.turnstile.render(turnstileRef.current, {
        sitekey: siteKey,
        theme: "dark",
        callback: (turnstileToken) => {
          void verifyAndRedirect(turnstileToken);
        },
        "expired-callback": () => setError("The security check expired. Please try again."),
        "error-callback": () => setError("The security check failed. Please try again."),
      });
    };

    renderWidget();
    const interval = window.setInterval(renderWidget, 50);

    return () => {
      cancelled = true;
      window.clearInterval(interval);
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [isDialogOpen, siteKey, scriptReady]);

  const verifyAndRedirect = async (turnstileToken: string) => {
    setError("");
    setIsVerifying(true);

    try {
      const response = await fetch("/api/cv-download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: turnstileToken }),
      });

      if (!response.ok) {
        setError("Security verification failed. Please try again.");
        setIsVerifying(false);
        return;
      }

      window.location.href = "https://files.dagomirwojcik.com/dagomir-wojcik_cv.pdf";
    } catch {
      setError("Security verification failed. Please try again.");
      setIsVerifying(false);
    }
  };

  const handleDownload = () => {
    if (!siteKey) {
      setError("Security verification is currently unavailable.");
      return;
    }

    setError("");
    setIsDialogOpen(true);
  };

  return (
    <div
      className={className}
      style={{ 
        width: '100%',
        ...style 
      }}
    >
      {siteKey && (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
          id="cloudflare-turnstile-script"
          strategy="afterInteractive"
          onLoad={() => setScriptReady(true)}
        />
      )}
      <div
        onClick={handleDownload}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          width: "100%",
          cursor: "pointer",
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
          filter: isHovered ? 'brightness(1.08)' : 'brightness(1)',
          zIndex: isHovered ? 2 : 1,
        }}
      >
        <MaintenanceBanner
          title="Download My CV"
          description="Get a copy of my professional resume with all my skills & experience!"
          variant="download"
          cardStyle={{
            boxShadow: isHovered 
              ? '0 8px 32px var(--glass-card-shadow-hover)' 
              : '0 2px 8px var(--glass-card-shadow)',
          }}
        />
      </div>
      {error && <div role="alert" style={{ marginTop: 8, textAlign: "center" }}>{error}</div>}
      <Dialog
        open={isDialogOpen}
        onClose={() => {
          if (!isVerifying) setIsDialogOpen(false);
        }}
        title="Verify before downloading"
        description="Complete the security check to access my CV."
      >
        <div style={{ minHeight: 80, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div ref={turnstileRef} />
        </div>
        {error && <div role="alert" style={{ marginTop: 8, textAlign: "center" }}>{error}</div>}
      </Dialog>
    </div>
  );
} 