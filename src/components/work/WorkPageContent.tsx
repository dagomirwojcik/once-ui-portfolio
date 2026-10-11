"use client";

import { Column } from "@once-ui-system/core";
import { work } from "@/resources";
import { buildWorkStats } from "@/app/utils/workStats";
import { splitFeaturedProjects } from "@/app/utils/workProjects";
import { WorkStatsBar } from "./WorkStatsBar";
import { WorkFeatured } from "./WorkFeatured";
import { WorkProjectGrid } from "./WorkProjectGrid";

interface WorkPageContentProps {
  projects: Array<{
    slug: string;
    content: string;
    metadata: {
      title: string;
      summary?: string;
      publishedAt: string;
      images?: string[];
      link?: string;
      team?: { avatar?: string }[];
      featured?: boolean;
    };
  }>;
}

export function WorkPageContent({ projects }: WorkPageContentProps) {
  const { featured, rest } = splitFeaturedProjects(projects, work.featured);
  const stats = buildWorkStats(projects);

  return (
    <Column fillWidth gap="xl" paddingX="8">
      <WorkStatsBar stats={stats} />

      {featured.length > 0 && <WorkFeatured projects={featured} />}

      {rest.length > 0 && <WorkProjectGrid projects={rest} />}
    </Column>
  );
}
