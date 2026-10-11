"use client";

import { Column, Heading, RevealFx } from "@once-ui-system/core";
import { LatestItemCard } from "@/components/LatestItemCard";
import styles from "./Projects.module.scss";

interface WorkFeaturedProps {
  projects: Array<{
    slug: string;
    metadata: {
      title: string;
      summary?: string;
      publishedAt: string;
      images?: string[];
      team?: unknown[];
    };
  }>;
}

export function WorkFeatured({ projects }: WorkFeaturedProps) {
  if (projects.length === 0) return null;

  const heading = projects.length === 1 ? "Featured Project" : "Featured Projects";

  return (
    <Column fillWidth gap="l">
      <RevealFx speed="fast" translateY="8" delay={0.25} fillWidth>
        <Column fillWidth horizontal="center">
          <Heading as="h2" variant="heading-strong-l" align="center">
            {heading}
          </Heading>
        </Column>
      </RevealFx>
      <div
        className={
          projects.length === 1 ? styles.featuredSingle : styles.featuredGrid
        }
      >
        {projects.map((project, index) => (
          <RevealFx
            key={project.slug}
            speed="fast"
            translateY="12"
            delay={0.35 + index * 0.06}
            fillWidth
          >
            <LatestItemCard
              href={`/work/${project.slug}`}
              image={project.metadata.images?.[0]}
              title={project.metadata.title}
              summary={project.metadata.summary}
              publishedAt={project.metadata.publishedAt}
              type="project"
              team={project.metadata.team}
            />
          </RevealFx>
        ))}
      </div>
    </Column>
  );
}
