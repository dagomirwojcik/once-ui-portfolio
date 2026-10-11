"use client";

import { useRouter } from "next/navigation";
import styles from "@/components/blog/Posts.module.scss";

export function FeelingLuckyButton({ slugs }: { slugs: string[] }) {
  const router = useRouter();

  const handleLucky = () => {
    if (slugs.length > 0) {
      const random = Math.floor(Math.random() * slugs.length);
      router.push(`/blog/${slugs[random]}`);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <button
        type="button"
        onClick={handleLucky}
        className={`${styles.blogActionButton} ${styles.blogActionButtonLucky}`}
      >
        I&apos;m Feeling Lucky
      </button>
    </div>
  );
}
