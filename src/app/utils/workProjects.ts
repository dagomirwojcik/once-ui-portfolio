interface WorkProjectLike {
  slug: string;
  metadata: {
    publishedAt: string;
    featured?: boolean;
  };
}

function byNewest<T extends WorkProjectLike>(a: T, b: T) {
  return (
    new Date(b.metadata.publishedAt).getTime() -
    new Date(a.metadata.publishedAt).getTime()
  );
}

/**
 * Picks highlighted projects for /work.
 * 1. Ordered slug list (`work.featured`) when it matches existing projects
 * 2. Projects with `featured: true` in MDX frontmatter
 * 3. The most recently published project
 */
export function splitFeaturedProjects<T extends WorkProjectLike>(
  projects: T[],
  featuredSlugs: string[] = [],
): { featured: T[]; rest: T[] } {
  const bySlug = new Map(projects.map((project) => [project.slug, project]));

  const fromConfig = featuredSlugs
    .map((slug) => bySlug.get(slug))
    .filter((project): project is T => Boolean(project));

  const featured =
    fromConfig.length > 0
      ? fromConfig
      : (() => {
          const marked = projects.filter((project) => project.metadata.featured);
          if (marked.length > 0) {
            return [...marked].sort(byNewest);
          }
          const newest = [...projects].sort(byNewest)[0];
          return newest ? [newest] : [];
        })();

  const featuredSlugsSet = new Set(featured.map((project) => project.slug));
  const rest = projects.filter((project) => !featuredSlugsSet.has(project.slug)).sort(byNewest);

  return { featured, rest };
}
