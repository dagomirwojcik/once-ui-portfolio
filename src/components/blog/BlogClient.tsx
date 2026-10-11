"use client";
import { useState, useMemo, useEffect } from "react";
import {
  Column,
  Heading,
  Text,
  Select,
  Flex,
  DateRangeInput,
  IconButton,
  type DateRange,
} from "@once-ui-system/core";
import { Mailchimp } from "@/components";
import { Posts } from "@/components/blog/Posts";
import { blog, newsletter } from "@/resources";
import styles from "@/components/blog/Posts.module.scss";
import { FeelingLuckyButton } from '@/components/blog/FeelingLuckyButton';

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return isMobile;
}

export function BlogClient({ posts }: { posts: any[] }) {
  const allTags = useMemo(() => {
    const tags = posts.map(post => post.metadata.tag).filter(Boolean);
    return Array.from(new Set(tags)).sort((a, b) =>
      a.localeCompare(b, undefined, { sensitivity: "base" }),
    );
  }, [posts]);

  const tagOptions = useMemo(
    () => [
      { label: "All", value: "" },
      ...allTags.map((tag) => ({ label: tag, value: tag })),
    ],
    [allTags],
  );

  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>(undefined);

  const hasDateFilter = Boolean(
    selectedRange?.startDate || selectedRange?.endDate,
  );

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const tagMatch = !selectedTag || post.metadata.tag === selectedTag;
      if (!hasDateFilter) return tagMatch;

      const published = new Date(post.metadata.publishedAt);
      if (Number.isNaN(published.getTime())) return false;

      published.setHours(0, 0, 0, 0);

      if (selectedRange?.startDate) {
        const start = new Date(selectedRange.startDate);
        start.setHours(0, 0, 0, 0);
        if (published < start) return false;
      }

      if (selectedRange?.endDate) {
        const end = new Date(selectedRange.endDate);
        end.setHours(23, 59, 59, 999);
        if (published > end) return false;
      }

      return tagMatch;
    });
  }, [posts, selectedTag, selectedRange, hasDateFilter]);

  const slugs = filteredPosts.map((post) => post.slug);

  const sortedPosts = useMemo(() => {
    return [...filteredPosts].sort((a, b) => {
      return new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime();
    });
  }, [filteredPosts]);

  const isMobile = useIsMobile();
  const [visibleCount, setVisibleCount] = useState(5);
  const [desktopVisibleCount, setDesktopVisibleCount] = useState(6);

  useEffect(() => {
    setVisibleCount(5);
    setDesktopVisibleCount(6);
  }, [selectedTag, selectedRange]);

  const visiblePosts = isMobile ? sortedPosts.slice(0, visibleCount) : sortedPosts.slice(0, desktopVisibleCount);
  const canLoadMore = isMobile && visibleCount < sortedPosts.length;
  const canReadMore = !isMobile && desktopVisibleCount < sortedPosts.length;
  const hasActiveFilters = Boolean(selectedTag || hasDateFilter);

  return (
    <>
      <div className={styles.heroSection}>
        <Column gap="m" style={{ textAlign: "center", padding: "80px 24px" }}>
          <Heading as="h1" variant="heading-strong-xl" wrap="balance">
            My Blog
          </Heading>
          <Text variant="body-default-l" onBackground="neutral-weak" wrap="balance">
            {blog.description}
          </Text>

          <Flex fillWidth gap="m" wrap vertical="end" className={styles.filterRow}>
            <div className={styles.filterField}>
              <Select
                id="blog-tag-filter"
                label="Category"
                options={tagOptions}
                value={selectedTag ?? ""}
                onSelect={(value) => {
                  if (Array.isArray(value)) {
                    setSelectedTag(value[0] ?? null);
                  } else {
                    setSelectedTag(value || null);
                  }
                }}
                fillWidth
              />
            </div>

            <div className={styles.filterField}>
              <Flex horizontal="between" vertical="center" marginBottom="8">
                <Text variant="label-default-s" onBackground="neutral-weak">
                  Date range
                </Text>
                {hasDateFilter && (
                  <IconButton
                    icon="close"
                    variant="ghost"
                    size="s"
                    tooltip="Clear dates"
                    aria-label="Clear date filter"
                    onClick={() => setSelectedRange(undefined)}
                  />
                )}
              </Flex>

              <DateRangeInput
                key={
                  selectedRange?.startDate?.getTime() ??
                  selectedRange?.endDate?.getTime() ??
                  "blog-date-range-empty"
                }
                id="blog-date-range"
                startLabel="From"
                endLabel="To"
                value={selectedRange}
                onChange={setSelectedRange}
                className={styles.dateRangeInput}
              />
            </div>
          </Flex>
        </Column>
      </div>

      {!hasActiveFilters && (
        <div style={{ textAlign: "center", padding: "0px 24px 0px 24px" }}>
          <FeelingLuckyButton slugs={slugs} />
        </div>
      )}

      <Posts
        posts={visiblePosts}
        columns={isMobile ? "1" : visiblePosts.length > 0 ? "3" : "1"}
        thumbnail
        direction="column"
      />

      {hasActiveFilters && sortedPosts.length === 0 && (
        <Text
          variant="body-default-m"
          onBackground="neutral-weak"
          className={styles.emptyResults}
        >
          No posts match your filters.
        </Text>
      )}

      {canLoadMore && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 0, marginBottom: 12 }}>
          <button
            onClick={() => setVisibleCount(c => c + 5)}
            className={styles.categoryTag}
            style={{ cursor: 'pointer', fontSize: 14, fontWeight: 500, marginTop: 0 }}
          >
            Load More
          </button>
        </div>
      )}

      {canReadMore && (
        <div style={{ textAlign: "center", padding: "0px 24px 0px 24px", marginTop: "-40px" }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button
              type="button"
              onClick={() => setDesktopVisibleCount(c => c + 6)}
              className={styles.blogActionButton}
            >
              Read More
            </button>
          </div>
        </div>
      )}

      {newsletter.display && <Mailchimp newsletter={newsletter} />}
    </>
  );
}
