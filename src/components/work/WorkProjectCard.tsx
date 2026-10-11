"use client";

import { useState } from "react";
import {
  AvatarGroup,
  Flex,
  Heading,
  SmartLink,
  Text,
} from "@once-ui-system/core";
import { formatDate } from "@/app/utils/formatDate";
import { limitWords } from "@/app/utils/clientUtils";
import styles from "./WorkProjectCard.module.scss";

interface TeamMember {
  avatar?: string;
}

interface WorkProjectCardProps {
  href: string;
  link?: string;
  title: string;
  summary?: string;
  publishedAt: string;
  team?: TeamMember[];
  showLearnMore?: boolean;
}

function processAvatars(team?: TeamMember[]) {
  return (
    team?.map((member) => {
      const avatar = member.avatar;
      if (
        typeof avatar === "string" &&
        avatar.length <= 3 &&
        !avatar.startsWith("http") &&
        !avatar.startsWith("/") &&
        !avatar.includes(".")
      ) {
        return { value: avatar };
      }
      return { src: avatar };
    }) ?? []
  );
}

export function WorkProjectCard({
  href,
  link,
  title,
  summary,
  publishedAt,
  team,
  showLearnMore = true,
}: WorkProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const avatars = processAvatars(team);

  return (
    <article
      className={`${styles.card} ${isHovered ? styles.cardHovered : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={styles.body}>
        <div className={styles.titleRow}>
          <Heading
            as="h3"
            variant="heading-strong-s"
            wrap="balance"
            className={styles.title}
          >
            {title}
          </Heading>
          {avatars.length > 0 && (
            <div className={styles.avatarCorner}>
              <AvatarGroup avatars={avatars} size="s" reverse />
            </div>
          )}
        </div>

        <Text
          variant="label-default-xs"
          onBackground="neutral-weak"
          className={styles.date}
        >
          {formatDate(publishedAt, false)}
        </Text>

        {summary && (
          <Text
            variant="body-default-xs"
            onBackground="neutral-weak"
            wrap="balance"
            className={styles.summary}
          >
            {limitWords(summary, 14)}
          </Text>
        )}

        {(link || showLearnMore) && (
          <Flex fillWidth vertical="center" className={styles.footer}>
            {link ? (
              <SmartLink
                suffixIcon="arrowUpRightFromSquare"
                href={link}
                className={styles.actionButton}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Text variant="body-default-s">View project</Text>
              </SmartLink>
            ) : (
              <span />
            )}
            {showLearnMore && (
              <SmartLink
                suffixIcon="arrowRight"
                href={href}
                className={`${styles.actionButton} ${styles.learnMore}`}
              >
                <Text variant="body-default-s">Learn more</Text>
              </SmartLink>
            )}
          </Flex>
        )}
      </div>
    </article>
  );
}
