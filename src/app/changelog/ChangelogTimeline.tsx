"use client";
import { useMemo, useState } from "react";
import { Column, Flex, Heading, Icon, Select, Text } from "@once-ui-system/core";
import type { IconName } from "@once-ui-system/core";
import styles from "@/components/gallery/Gallery.module.scss";
import pageStyles from "./Changelog.module.scss";
import { ChangelogEntry } from "./data";

interface ChangelogTimelineProps {
  entries: ChangelogEntry[];
}

const CHANGE_LINE_ICONS: IconName[] = [
  "checkCircle",
  "document",
  "arrowRight",
  "clipboard",
  "infoCircle",
];

export default function ChangelogTimeline({
  entries,
}: ChangelogTimelineProps) {
  const sortedEntries = useMemo(() => {
    return [...entries].sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }, [entries]);

  const allTags = useMemo(() => {
    const collector = sortedEntries.flatMap((entry) => entry.tags);
    return Array.from(new Set(collector));
  }, [sortedEntries]);

  const tagOptions = useMemo(
    () => [
      { label: "All", value: "" },
      ...allTags.map((tag) => ({ label: tag, value: tag })),
    ],
    [allTags],
  );

  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filteredEntries = useMemo(() => {
    if (!selectedTag) return sortedEntries;
    return sortedEntries.filter((entry) => entry.tags.includes(selectedTag));
  }, [selectedTag, sortedEntries]);

  return (
    <>
      <div className={styles.heroSection}>
        <Column gap="m" style={{ textAlign: "center", padding: "80px 24px" }}>
          <Heading as="h1" variant="heading-strong-xl" wrap="balance">
            Changelog
          </Heading>
          <Text variant="body-default-l" onBackground="neutral-weak" wrap="balance">
            All updates, fixes, and improvements listed by version.
          </Text>

          <Flex horizontal="center" fillWidth className={pageStyles.heroFilterRow}>
            <div className={pageStyles.heroFilterField}>
              <Select
                id="changelog-tag-filter"
                label="Release type"
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
          </Flex>
        </Column>
      </div>

      <div className={pageStyles.contentArea}>
        <div className={pageStyles.timelineContainer}>
          {filteredEntries.length === 0 && (
            <Text
              variant="body-default-m"
              onBackground="neutral-weak"
              style={{ textAlign: "center", gridColumn: "1 / -1" }}
            >
              No entries match this filter yet. Try another tag.
            </Text>
          )}

          {filteredEntries.map((entry) => (
            <article key={entry.version ?? entry.date} className={pageStyles.entryCard}>
              <header className={pageStyles.cardHeader}>
                <div className={pageStyles.cardHeaderMeta}>
                  {entry.version ? (
                    <span className={pageStyles.versionBadge}>{entry.version}</span>
                  ) : (
                    <span className={pageStyles.versionBadgeMuted}>Release</span>
                  )}

                  {entry.tags.length > 0 && (
                    <div className={pageStyles.entryTags}>
                      {entry.tags.map((tag) => (
                        <span
                          key={tag}
                          className={
                            tag === "Major Update"
                              ? `${pageStyles.tagPill} ${pageStyles.tagPillMajor}`
                              : pageStyles.tagPill
                          }
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className={pageStyles.cardHeaderTitle}>
                  {entry.focus ? (
                    <Text
                      variant="body-default-l"
                      onBackground="neutral-weak"
                      className={pageStyles.entryTitle}
                      wrap="balance"
                    >
                      {entry.focus}
                    </Text>
                  ) : (
                    <Text
                      variant="body-default-s"
                      onBackground="neutral-weak"
                      className={pageStyles.entryTitleMuted}
                    >
                      No summary for this release.
                    </Text>
                  )}
                </div>

                <div className={pageStyles.cardHeaderDate}>
                  <Text
                    as="time"
                    variant="body-default-s"
                    onBackground="neutral-weak"
                    className={pageStyles.entryDate}
                  >
                    {entry.date}
                  </Text>
                </div>
              </header>

              <ul className={pageStyles.changeList}>
                {entry.changes.map((change, changeIndex) => {
                  const iconName = CHANGE_LINE_ICONS[changeIndex % CHANGE_LINE_ICONS.length];
                  return (
                    <li key={changeIndex} className={pageStyles.changeListItem}>
                      <span className={pageStyles.changeListIcon} aria-hidden>
                        <Icon name={iconName} size="s" onBackground="neutral-weak" />
                      </span>
                      <Text
                        variant="body-default-m"
                        onBackground="neutral-weak"
                        as="span"
                        className={pageStyles.changeListText}
                      >
                        {change}
                      </Text>
                    </li>
                  );
                })}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}