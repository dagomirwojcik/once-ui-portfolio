"use client";
import React from "react";
import styles from "./TickerVertical.module.scss";

export type TickerVerticalItemData = {
  text: string;
  icon?: React.ReactNode;
};

/** Shared scroll rate so tickers with different item counts stay in sync */
export const TICKER_SECONDS_PER_ITEM = 2;

interface TickerVerticalProps {
  items: Array<string | TickerVerticalItemData>;
  visibleCount?: number; // How many items to show at once
  /** Total loop duration in seconds; overrides secondsPerItem when set */
  duration?: number;
  /** Seconds per item; loop duration = items.length × this (default 2) */
  secondsPerItem?: number;
  direction?: "down" | "up";
  itemAlign?: "left" | "right" | "center";
  /** Omit glass chrome when nested inside another card */
  bare?: boolean;
  /** Line height per item in em units (default 2.8) */
  itemHeightEm?: number;
}

const TickerVertical: React.FC<TickerVerticalProps> = ({
  items,
  visibleCount = 3,
  duration,
  secondsPerItem = TICKER_SECONDS_PER_ITEM,
  direction = "down",
  itemAlign = "center",
  bare = false,
  itemHeightEm = 2.8,
}) => {
  const normalizeItem = (item: string | TickerVerticalItemData): TickerVerticalItemData =>
    typeof item === "string" ? { text: item } : item;

  const loopDuration = duration ?? items.length * secondsPerItem;

  // Repeat the array for seamless looping
  const displayItems = [...items, ...items].map(normalizeItem);

  const glassStyle = bare
    ? undefined
    : {
        borderRadius: "var(--radius-l)",
        border: "2px solid var(--glass-card-border)",
        background: "var(--glass-card-bg)",
        backdropFilter: "var(--glass-backdrop)",
        WebkitBackdropFilter: "var(--glass-backdrop)",
        zIndex: "var(--glass-z-index)",
        boxShadow: "var(--glass-card-shadow)",
      };

  return (
    <div
      className={
        bare
          ? `${styles.tickerVerticalContainer} ${styles.tickerVerticalBare}`
          : styles.tickerVerticalContainer
      }
      style={{
        height: `${visibleCount * itemHeightEm}em`,
        overflow: "hidden",
        transition: "none",
        transform: "none",
        ...glassStyle,
      }}
    >
      <div
        className={styles.tickerVerticalContent}
        style={{
          animationDuration: `${loopDuration}s`,
          animationDirection: direction === "up" ? "reverse" : "normal",
        }}
      >
        {displayItems.map((item, idx) => {
          const alignClass =
            itemAlign === "right"
              ? styles.tickerVerticalItemRight
              : itemAlign === "center"
              ? styles.tickerVerticalItemCenter
              : "";

          return (
            <div
              className={[
                styles.tickerVerticalItem,
                alignClass,
                item.icon ? styles.tickerVerticalItemWithIcon : "",
              ]
                .filter(Boolean)
                .join(" ")}
              key={idx}
              title={item.text}
              style={{
                lineHeight: `${itemHeightEm}em`,
                height: `${itemHeightEm}em`,
              }}
            >
              {item.icon ? (
                <>
                  <span className={styles.tickerVerticalIcon} aria-hidden>
                    {item.icon}
                  </span>
                  <span className={styles.tickerVerticalLabel}>{item.text}</span>
                </>
              ) : (
                item.text
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TickerVertical;
