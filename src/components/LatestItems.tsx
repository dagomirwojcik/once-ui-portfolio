"use client";

import { Column, Flex, Heading } from '@once-ui-system/core';
import { LatestItemCard } from './LatestItemCard';
import { GalleryAlbumWithCategory } from '@/data/galleryData';
import styles from './LatestItems.module.scss';

interface LatestItemsProps {
  latestProject: any | null;
  latestBlog: any | null;
  latestGallery: GalleryAlbumWithCategory | null;
}

export default function LatestItems({ latestProject, latestBlog, latestGallery }: LatestItemsProps) {
  return (
    <Column maxWidth="m" gap="xl" horizontal="center">
      <Column fillWidth gap="s">
        <Heading variant="heading-strong-xl" style={{ textAlign: "center" }}>
          Latest Updates
        </Heading>
      </Column>

      <Flex gap="24" direction="row" className={styles.latestItemsContainer}>
        {/* Latest Project */}
        {latestProject && (
          <Column flex="1" className={styles.latestItem}>
            <LatestItemCard
              href={`/work/${latestProject.slug}`}
              image={latestProject.metadata.images?.[0]}
              title={latestProject.metadata.title}
              summary={latestProject.metadata.summary}
              publishedAt={latestProject.metadata.publishedAt}
              badge={{
                text: "Latest Project",
                background: "surface"
              }}
              type="project"
              team={latestProject.metadata.team}
            />
          </Column>
        )}

        {/* Latest Blog Post */}
        {latestBlog && (
          <Column flex="1" className={styles.latestItem}>
            <LatestItemCard
              href={`/blog/${latestBlog.slug}`}
              image={latestBlog.metadata.image}
              title={latestBlog.metadata.title}
              summary={latestBlog.metadata.summary}
              publishedAt={latestBlog.metadata.publishedAt}
              badge={{
                text: "Latest Blog",
                background: "surface"
              }}
              type="blog"
              tag={latestBlog.metadata.tag}
            />
          </Column>
        )}

        {latestGallery && (
          <Column flex="1" className={styles.latestItem}>
            <LatestItemCard
              href="/gallery"
              image={latestGallery.coverImage}
              title={latestGallery.title}
              summary={latestGallery.summary}
              publishedAt={latestGallery.date}
              badge={{
                text: "Latest Gallery",
                background: "surface",
              }}
              type="album"
              category={latestGallery.categoryName || latestGallery.category}
            />
          </Column>
        )}
      </Flex>
    </Column>
  );
}
