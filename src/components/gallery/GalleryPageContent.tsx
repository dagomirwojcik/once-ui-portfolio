"use client";

import { useState } from "react";
import { Column } from "@once-ui-system/core";
import styles from "@/components/gallery/Gallery.module.scss";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { GalleryHero } from "@/components/gallery/GalleryHero";

export function GalleryPageContent() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <div className={styles.galleryPageShell}>
      <Column maxWidth="xl" gap="xl" className={styles.galleryContent} style={{ marginInline: "auto" }}>
        <GalleryHero />

        <GalleryGrid selectedCategory={selectedCategory} />
      </Column>
    </div>
  );
}
