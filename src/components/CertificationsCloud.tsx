"use client";

import { RevealFx, Heading } from "@once-ui-system/core";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import styles from "./CertificationsCloud.module.scss";

interface CertificationsCloudProps {
  items?: never; // disable old image API
  maxItems?: number; // kept for API parity, defaults to 3 for icons
  rotateMs?: number; // interval to reshuffle
  disableHover?: boolean;
}

export const CertificationsCloud: React.FC<CertificationsCloudProps> = ({ items, maxItems, disableHover = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  const effectiveHover = !disableHover && isHovered;
  const brandSources = useMemo(() => ({
    // Wikimedia first, then favicon fallback
    microsoft: [
      "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
      "https://www.google.com/s2/favicons?domain=microsoft.com&sz=64",
    ],
    ibm: [
      "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
      "https://www.google.com/s2/favicons?domain=ibm.com&sz=64",
    ],
    pmi: [
      "https://upload.wikimedia.org/wikipedia/commons/5/5d/Project_Management_Institute_logo.svg",
      "https://www.google.com/s2/favicons?domain=pmi.org&sz=64",
    ],
    cisco: [
      "https://upload.wikimedia.org/wikipedia/commons/6/64/Cisco_logo.svg",
      "https://www.google.com/s2/favicons?domain=cisco.com&sz=64",
    ],
    linkedin: [
      "https://upload.wikimedia.org/wikipedia/commons/8/81/LinkedIn_icon.svg",
      "https://www.google.com/s2/favicons?domain=linkedin.com&sz=64",
    ],
  }), []);
  const allIconKeys = useMemo(() => ["microsoft", "ibm", "pmi", "cisco", "linkedin"] as const, []);
  const availableIconKeys = useMemo(() => {
    return (allIconKeys as unknown as string[]).filter((k) => Boolean(brandSources[k as keyof typeof brandSources]?.length));
  }, [allIconKeys, brandSources]);
  const [visibleThree, setVisibleThree] = useState<string[]>([]);
  const [isBatchFading, setIsBatchFading] = useState<boolean>(false);

  const pick = (arr: string[], n: number) => arr.slice(0, n);
  const shuffle = (arr: string[]) => {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  // initialize three icons
  useEffect(() => {
    const initial = shuffle(availableIconKeys).slice(0, 3);
    setVisibleThree(initial);
  }, [availableIconKeys]);

  // swap all three at once periodically with a fade
  useEffect(() => {
    if (availableIconKeys.length === 0) return;
    const id = setInterval(() => {
      setIsBatchFading(true);
      setTimeout(() => {
        const nextThree = shuffle(availableIconKeys).slice(0, 3);
        setVisibleThree(nextThree);
        setIsBatchFading(false);
      }, 250);
    }, 8000);
    return () => clearInterval(id);
  }, [availableIconKeys]);

  const count = typeof maxItems === "number" ? Math.max(1, Math.min(3, maxItems)) : 3;
  const visible = visibleThree.length ? visibleThree : (availableIconKeys as unknown as string[]).slice(0, count);
  return (
    <RevealFx speed="fast" translateY="4" fillWidth>
      <div
        style={{
          width: "100%",
          boxSizing: "border-box",
          borderRadius: "var(--radius-l)",
          border: `2px solid var(--glass-card-border)`,
          background: `var(--glass-card-bg)`,
          backdropFilter: "var(--glass-backdrop)",
          WebkitBackdropFilter: "var(--glass-backdrop)",
          overflow: "hidden",
          zIndex: "var(--glass-z-index)",
          padding: "24px",
          gap: "24px",
          transition: "all 0.3s ease",
      transform: effectiveHover ? "translateY(-4px)" : "translateY(0)",
      boxShadow: effectiveHover
            ? `0 8px 32px var(--glass-card-shadow-hover)`
            : `0 2px 8px var(--glass-card-shadow)`,
        }}
    onMouseEnter={() => { if (!disableHover) setIsHovered(true); }}
    onMouseLeave={() => { if (!disableHover) setIsHovered(false); }}
      >
        <div className={styles.wrapper}>
          <div className={styles.header}>
            <Heading as="h3" variant="heading-strong-s" onBackground="neutral-weak">
              Obtained Certifications From:
            </Heading>
          </div>
          <div className={styles.cloud}>
            {visible.map((key, idx) => {
              const sources = brandSources[key as keyof typeof brandSources] || [];
              if (!sources.length) return null;
              return (
                <div key={`${key}-${idx}`} className={`${styles.item} ${isBatchFading ? styles.fadeOut : ''}`}>
                  <img
                    src={sources[0]}
                    alt={key}
                    style={{ width: 64, height: 64, objectFit: "contain" }}
                    onError={(e) => {
                      const el = e.currentTarget as HTMLImageElement & { dataset: { srcIdx?: string } };
                      const currentIdx = Number(el.dataset.srcIdx || '0');
                      const nextIdx = currentIdx + 1;
                      if (nextIdx < sources.length) {
                        el.dataset.srcIdx = String(nextIdx);
                        el.src = sources[nextIdx];
                      }
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </RevealFx>
  );
};


