"use client";

import { useState, useMemo } from "react";
import { Icon } from "@once-ui-system/core";
import { galleryCategories, GalleryCategory } from "@/data/galleryData";
import styles from "./GalleryClient.module.scss";

interface GalleryClientProps {
  onCategoryChange: (category: string | null) => void;
  selectedCategory: string | null;
}

export function GalleryClient({ onCategoryChange, selectedCategory }: GalleryClientProps) {
  // Get all unique categories for filtering
  const allCategories = useMemo(() => {
    const categories = galleryCategories.map(cat => cat.name);
    return Array.from(new Set(categories));
  }, []);

  return (
    <div className={styles.categoryTags}>
      <span
        className={styles.categoryTag + (!selectedCategory ? ' ' + styles.activeTag : '')}
        style={{ cursor: 'pointer' }}
        onClick={() => onCategoryChange(null)}
      >
        All
      </span>
      {allCategories.map(category => (
        <span
          key={category}
          className={styles.categoryTag + (selectedCategory === category ? ' ' + styles.activeTag : '')}
          style={{ cursor: 'pointer' }}
          onClick={() => onCategoryChange(category)}
        >
          {category}
        </span>
      ))}
    </div>
  );
}