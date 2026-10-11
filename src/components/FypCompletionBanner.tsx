"use client";

import { useEffect, useState } from "react";
import { Banner, Button, Row } from "@once-ui-system/core";

const STORAGE_KEY = "fundraiser-banner-dismissed";

const glassButtonStyle = {
  borderRadius: "var(--radius-s)",
  border: "2px solid var(--glass-button-border)",
  background: "var(--glass-button-bg)",
  backdropFilter: "var(--glass-backdrop)",
  WebkitBackdropFilter: "var(--glass-backdrop)",
  color: "var(--glass-button-text)",
  zIndex: "var(--glass-z-index)",
} as const;

const glassDonateButtonStyle = {
  ...glassButtonStyle,
  border: "1px solid var(--brand-border-strong)",
  boxShadow: "0 0 0 1px var(--brand-alpha-weak)",
} as const;

interface FypCompletionBannerProps {
  href: string;
}

export function FypCompletionBanner({ href }: FypCompletionBannerProps) {
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    setDismissed(localStorage.getItem(STORAGE_KEY) === "true");
  }, []);

  const dismiss = () => {
    localStorage.setItem(STORAGE_KEY, "true");
    setDismissed(true);
  };

  const handleDonate = () => {
    dismiss();
    window.open(href, "_blank", "noopener,noreferrer");
  };

  if (dismissed) {
    return null;
  }

  return (
    <Banner horizontal="between" fillWidth radius="none">
      I&apos;m running the Great Birmingham Run in May 2027 for Cancer Research UK. Please consider
      supporting my fundraiser. Every donation helps fund life-saving research. <br />
      <Row gap="8">
        <Button
          size="s"
          onClick={handleDonate}
          label="Donate"
          suffixIcon="arrowUpRightFromSquare"
          variant="secondary"
          style={glassDonateButtonStyle}
        />
        <Button
          size="s"
          onClick={dismiss}
          label="Dismiss"
          variant="secondary"
          style={glassButtonStyle}
        />
      </Row>
    </Banner>
  );
}
