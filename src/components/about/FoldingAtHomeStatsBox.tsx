"use client";

import { useEffect, useState } from "react";
import type { FoldingAtHomeStatsResponse } from "@/lib/foldingathome/types";
import styles from "./about.module.scss";

interface FoldingAtHomeStatsBoxProps {
  fallbackContent: React.ReactNode;
  showUpdated?: boolean;
}

function formatCount(value: number): string {
  return value.toLocaleString();
}

function formatUpdatedDate(isoDate: string): string {
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}/${date.getFullYear()}`;
}

export function FoldingAtHomeStatsBox({
  fallbackContent,
  showUpdated = true,
}: FoldingAtHomeStatsBoxProps) {
  const [payload, setPayload] = useState<FoldingAtHomeStatsResponse | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadStats() {
      try {
        const response = await fetch("/api/foldingathome/stats", { cache: "no-store" });
        if (!response.ok) {
          return;
        }

        const data = (await response.json()) as FoldingAtHomeStatsResponse;
        if (!cancelled) {
          setPayload(data);
        }
      } catch {
        // Keep fallback content when the live stats request fails.
      }
    }

    void loadStats();

    return () => {
      cancelled = true;
    };
  }, []);

  const donor = payload?.donor;
  const updatedSource = donor?.last
    ? donor.last.replace(" ", "T") + "Z"
    : payload?.fetchedAt;
  const updatedLabel = updatedSource ? formatUpdatedDate(updatedSource) : "";

  return (
    <div
      className={styles.foldingBox}
      style={{
        borderRadius: "10px",
        padding: "0.5em 0.75em",
        marginTop: "0.3em",
        marginBottom: "1em",
        fontSize: "1rem",
        lineHeight: "1.7",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div>
        {donor ? (
          <>
            I have earned <strong>{formatCount(donor.score)}</strong> points by contributing{" "}
            <strong>{formatCount(donor.wus)}</strong> work units.
          </>
        ) : (
          fallbackContent
        )}
      </div>
      {showUpdated && updatedLabel && <div>{`Updated: ${updatedLabel}`}</div>}
    </div>
  );
}
