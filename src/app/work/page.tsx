import { Column, Meta, Heading, Text, Particle } from "@once-ui-system/core";
import { StructuredData } from "@/components/seo/StructuredData";
import { workIndexSchemas } from "@/lib/pageSchemas";
import { baseURL, work } from "@/resources";
import { getPosts } from "@/app/utils/utils";
import { WorkPageContent } from "@/components/work/WorkPageContent";
import styles from "@/components/work/Projects.module.scss";

export async function generateMetadata() {
  return Meta.generate({
    title: work.title,
    description: work.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(work.title)}&description=${encodeURIComponent(work.description)}&type=work`,
    path: work.path,
  });
}

export default function Work() {
  const projects = getPosts(["src", "app", "work", "projects"]);

  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      <Particle
        fill
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
        }}
      />

      <Column maxWidth="xl" gap="xl" style={{ position: "relative", zIndex: 1 }}>
        <StructuredData data={workIndexSchemas(projects)} />

        {/* Hero Section — unchanged */}
        <div className={styles.heroSection}>
          <Column gap="m" style={{ textAlign: "center", padding: "80px 24px" }}>
            <Heading as="h1" variant="heading-strong-xl" wrap="balance">
              My Projects
            </Heading>
            <Text variant="body-default-l" onBackground="neutral-weak" wrap="balance">
              Exploring the intersection of technology, design, and innovation through hands-on projects.
            </Text>
            <div className={styles.categoryTags}>
              <span className={styles.categoryTag}>Technology</span>
              <span className={styles.categoryTag}>Charity</span>
              <span className={styles.categoryTag}>Research</span>
              <span className={styles.categoryTag}>Innovation</span>
            </div>
          </Column>
        </div>

        <WorkPageContent projects={projects} />
      </Column>
    </div>
  );
}
