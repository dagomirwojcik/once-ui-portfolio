"use client";

import {
  Column,
  Flex,
  Heading,
  Media,
  SmartLink,
  Text,
  Badge,
} from '@once-ui-system/core';
import { formatDate } from '@/app/utils/formatDate';
import { limitWords } from '@/app/utils/clientUtils';
import { getCardImageUrl } from '@/lib/imageUrl';
import { useState } from "react";
import styles from './LatestItemCard.module.scss';

interface LatestItemCardProps {
  href: string;
  image?: string;
  title: string;
  summary?: string;
  publishedAt: string;
  badge?: {
    text: string;
    background: "page" | "surface" | "overlay" | "transparent";
  };
  type: 'project' | 'blog' | 'album';
  team?: any[];
  tag?: string;
  category?: string;
}

export const LatestItemCard: React.FC<LatestItemCardProps> = ({
  href,
  image,
  title,
  summary,
  publishedAt,
  badge,
  type,
  team,
  tag,
  category,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const displayImage = getCardImageUrl(image) ?? image;

  return (
    <Column 
      fillWidth 
      gap="m"
      style={{
        borderRadius: "var(--radius-l)",
        border: `2px solid var(--glass-card-border)`,
        background: `var(--glass-card-bg)`,
        backdropFilter: "var(--glass-backdrop)",
        WebkitBackdropFilter: "var(--glass-backdrop)",
        overflow: "hidden",
        zIndex: "var(--glass-z-index)",
        transition: "all 0.3s ease",
        transform: isHovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: isHovered
          ? `0 8px 32px var(--glass-card-shadow-hover)`
          : `0 2px 8px var(--glass-card-shadow)`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Category Badge - Above image */}
      {badge && (
        <Flex horizontal="center" paddingY="16" paddingBottom="8">
          <Badge 
            background={badge.background} 
            paddingX="12" 
            paddingY="4" 
            onBackground="neutral-strong" 
            textVariant="label-default-s" 
            className={styles.badge}
          >
            {badge.text}
          </Badge>
        </Flex>
      )}

      {/* Content */}
      <SmartLink
        fillWidth
        unstyled
        href={href}
        style={{ borderRadius: 'var(--radius-l)' }}>
        <Flex
          position="relative"
          transition="micro-medium"
          direction="column"
          radius="l"
          fillWidth>
          {displayImage && (
            <Media
              priority
              sizes="(max-width: 768px) 100vw, 400px"
              border="neutral-alpha-weak"
              cursor="interactive"
              radius="l"
              src={displayImage}
              alt={`Thumbnail of ${title}`}
              aspectRatio="16/9"
              objectFit="cover"
            />
          )}
          <Column
            position="relative"
            fillWidth
            gap="8"
            padding="20"
            vertical="center"
            className={styles.contentColumn}>
            <Heading
              as="h3"
              variant="heading-strong-m"
              wrap="balance"
              className={styles.cardTitle}>
              {title}
            </Heading>
            {summary && (
              <Text
                variant="body-default-s"
                onBackground="neutral-weak"
                wrap="balance">
                {limitWords(summary, 9)}
              </Text>
            )}
            <Text
              variant="label-default-s"
              onBackground="neutral-weak">
              {formatDate(publishedAt, false)}
            </Text>
            {/* Type-specific badges */}
            {type === 'project' && team && (
              <Badge
                background="neutral-alpha-weak"
                paddingX="8"
                paddingY="2"
                onBackground="neutral-strong"
                textVariant="label-default-xs">
                {team.length > 1 ? 'Team Project' : 'Individual Project'}
              </Badge>
            )}
            {type === 'blog' && tag && (
              <Badge
                background="neutral-alpha-weak"
                paddingX="8"
                paddingY="2"
                onBackground="neutral-strong"
                textVariant="label-default-xs">
                {tag}
              </Badge>
            )}
            {type === 'album' && category && (
              <Badge
                background="neutral-alpha-weak"
                paddingX="8"
                paddingY="2"
                onBackground="neutral-strong"
                textVariant="label-default-xs">
                {category}
              </Badge>
            )}
          </Column>
        </Flex>
      </SmartLink>
    </Column>
  );
};
