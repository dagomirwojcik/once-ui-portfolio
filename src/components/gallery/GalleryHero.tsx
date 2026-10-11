"use client";

import { useState } from "react";
import { Column, Heading, Text } from "@once-ui-system/core";
import styles from "@/components/gallery/Gallery.module.scss";
import { GalleryClient } from "@/components/gallery/GalleryClient";

export function GalleryHero() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <div className={styles.heroSection}>
      <Column gap="m" style={{ textAlign: "center", padding: "80px 24px" }}>
        <Heading as="h1" variant="heading-strong-xl" wrap="balance">
          Photo Gallery
        </Heading>
        <Text variant="body-default-l" onBackground="neutral-weak" wrap="balance">
          A collection of memories, achievements, and special moments captured through photography.
        </Text>
        <GalleryClient onCategoryChange={setSelectedCategory} selectedCategory={selectedCategory} />
      </Column>
    </div>
  );
}
