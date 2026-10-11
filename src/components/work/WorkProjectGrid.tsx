"use client";

import { Column, Heading, RevealFx } from "@once-ui-system/core";
import { WorkProjectCard } from "./WorkProjectCard";
import styles from "./Projects.module.scss";

interface WorkProject {
  slug: string;
  metadata: {
    title: string;
    summary?: string;
    publishedAt: string;
    images?: string[];
    link?: string;
    team?: { avatar?: string }[];
  };
}

interface WorkProjectGridProps {
  projects: WorkProject[];
}

export function WorkProjectGrid({ projects }: WorkProjectGridProps) {
  if (projects.length === 0) return null;

  return (
    <Column fillWidth gap="l" className={styles.allProjectsSection}>
      <RevealFx speed="fast" translateY="8" delay={0.1} fillWidth>
        <Column fillWidth horizontal="center">
          <Heading as="h2" variant="heading-strong-l" align="center">
            All Projects
          </Heading>
        </Column>
      </RevealFx>

      <div className={styles.projectsGrid}>
        {projects.map((post, index) => (
          <RevealFx
            key={post.slug}
            speed="fast"
            translateY="12"
            delay={0.12 + index * 0.06}
            fillWidth
            className={styles.projectCard}
          >
            <WorkProjectCard
              href={`/work/${post.slug}`}
              link={post.metadata.link}
              title={post.metadata.title}
              summary={post.metadata.summary}
              publishedAt={post.metadata.publishedAt}
              team={post.metadata.team}
              showLearnMore={post.slug !== "chatdag"}
            />
          </RevealFx>
        ))}
      </div>
    </Column>
  );
}
