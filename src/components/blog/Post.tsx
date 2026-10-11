"use client";

import { Column, Flex, Heading, Media, SmartLink, Tag, Text, MatrixFx } from '@once-ui-system/core';
import { useState, useMemo, memo } from 'react';
import styles from './Posts.module.scss';
import { formatDate } from '@/app/utils/formatDate';

interface PostProps {
    post: any;
    thumbnail: boolean;
    direction?: "row" | "column";
    isStandout?: boolean;
    className?: string;
}

export default function Post({ post, thumbnail, direction, isStandout, className }: PostProps) {
    const [isHovered, setIsHovered] = useState(false);
    
    // Stable MatrixFx component that won't re-render on hover
    const MatrixBackground = useMemo(() => memo(function MatrixBackground(innerProps: any) {
        return <MatrixFx {...innerProps} />
    }), []);

    // Memoize props used by MatrixFx to prevent prop changes on hover
    const aspect = post.metadata.image && (post.metadata.aspectRatio === '1/1' || /1[\-_]1|square/i.test(post.metadata.image)) ? '1/1' : '16/9';

    const matrixFxBehindImageProps = useMemo(() => ({
        className: styles.image,
        speed: 8,
        colors: ["brand-solid-medium", "accent-solid-medium"],
        size: 4,
        spacing: 2,
        trigger: "instant",
        flicker: true,
        revealFrom: "center",
        aspectRatio: aspect,
        radius: "l",
        border: "neutral-alpha-weak",
        style: { position: 'absolute', inset: 0, opacity: 0.12, zIndex: 0, pointerEvents: 'none' }
    }), [aspect]);

    const matrixFxPlaceholderProps = useMemo(() => ({
        className: styles.image,
        speed: 8,
        colors: ["brand-solid-medium", "accent-solid-medium"],
        size: 4,
        spacing: 2,
        trigger: "instant",
        flicker: true,
        revealFrom: "center",
        aspectRatio: '16/9',
        radius: "l",
        border: "neutral-alpha-weak",
        style: { opacity: 0.12 }
    }), []);
    
    return (
        <SmartLink
            fillWidth
            unstyled
            style={{ borderRadius: 'var(--radius-l)' }}
            key={post.slug}
            href={`/blog/${post.slug}`}>
            <Flex
                position="relative"
                transition="micro-medium"
                direction={direction}
                radius="l"
                style={{
                  borderRadius: "var(--radius-l)",
                  border: `2px solid var(--glass-card-border)`,
                  background: `var(--glass-card-bg)`,
                  overflow: "hidden",
                  zIndex: isStandout ? 2 : "var(--glass-z-index)",
                  transition: "all 0.3s ease",
                  transform: isStandout 
                    ? (isHovered ? "scale(1.05) translateY(-4px)" : "scale(1.03)")
                    : (isHovered ? "translateY(-4px)" : "translateY(0)"),
                  boxShadow: isHovered
                    ? `0 8px 32px var(--glass-card-shadow-hover)`
                    : `0 2px 8px var(--glass-card-shadow)`,
                  filter: isHovered ? "brightness(1.08)" : "none",
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className={className}
                fillWidth>
                {thumbnail && (
                    post.metadata.image ? (
                        <div style={{ position: 'relative', width: '100%' }}>
                            {/* MatrixFx background behind image */}
                            <MatrixBackground key={`matrix-${post.slug}`} {...matrixFxBehindImageProps} />
                            <Media
                                priority
                                className={styles.image}
                                sizes="(max-width: 768px) 100vw, 640px"
                                border="neutral-alpha-weak"
                                cursor="interactive"
                                radius="l"
                                src={post.metadata.image}
                                alt={'Thumbnail of ' + post.metadata.title}
                                {...(post.metadata.aspectRatio === '1/1' || /1[\-_]1|square/i.test(post.metadata.image)
                                  ? { aspectRatio: '1/1', objectFit: 'contain' }
                                  : { aspectRatio: '16/9', objectFit: 'contain' }
                                )}
                                style={{ position: 'relative', zIndex: 1 }}
                            />
                        </div>
                    ) : (
                        <MatrixBackground key={`matrix-${post.slug}`} {...matrixFxPlaceholderProps} />
                    )
                )}
                <Column
                    position="relative"
                    fillWidth gap="4"
                    padding="24"
                    vertical="center">
                    <Heading
                        as="h2"
                        variant="heading-strong-l"
                        wrap="balance">
                        {post.metadata.title}
                    </Heading>
                    {post.metadata.summary && (
                        <Text
                            variant="body-default-m"
                            onBackground="neutral-weak"
                            style={{ margin: '8px 0' }}
                        >
                            {post.metadata.summary}
                        </Text>
                    )}
                    <Text
                        variant="label-default-s"
                        onBackground="neutral-weak">
                        {formatDate(post.metadata.publishedAt, false)}
                    </Text>
                    { post.metadata.tag &&
                        <Tag
                            className="mt-12"
                            label={post.metadata.tag}
                                scheme="neutral" />
                    }
                </Column>
            </Flex>
        </SmartLink>
    );
}