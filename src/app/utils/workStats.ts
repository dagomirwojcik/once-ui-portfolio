import type { IconName } from "@/resources/icons";

export interface WorkStat {
  count: number;
  label: string;
  icon: IconName;
  plus?: boolean;
}

interface ProjectPost {
  metadata: {
    publishedAt: string;
    team?: unknown[];
  };
}

export function buildWorkStats(projects: ProjectPost[]): WorkStat[] {
  const teamCount = projects.filter((p) => (p.metadata.team?.length ?? 0) > 1).length;
  const soloCount = projects.length - teamCount;

  const years = projects
    .map((p) => new Date(p.metadata.publishedAt).getFullYear())
    .filter((y) => !Number.isNaN(y));

  const yearsActive =
    years.length > 0 ? Math.max(...years) - Math.min(...years) + 1 : 0;

  return [
    {
      count: projects.length,
      label: "Projects",
      icon: "briefcase",
    },
    {
      count: teamCount,
      label: "Team Projects",
      icon: "grid",
    },
    {
      count: soloCount,
      label: "Solo Projects",
      icon: "person",
    },
    {
      count: yearsActive,
      label: yearsActive === 1 ? "Year Active" : "Years Active",
      icon: "calendar",
    },
  ];
}
