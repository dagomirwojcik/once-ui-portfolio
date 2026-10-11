import { getPosts } from "@/app/utils/utils";
import { Meta, Particle, Column } from "@once-ui-system/core";
import { StructuredData } from "@/components/seo/StructuredData";
import { blogIndexSchemas } from "@/lib/pageSchemas";
import { blog, baseURL } from "@/resources";
import { BlogClient } from "@/components/blog/BlogClient";

export async function generateMetadata() {
  return Meta.generate({
    title: blog.title,
    description: blog.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(blog.title)}&description=${encodeURIComponent(blog.description)}&type=blog`,
    path: blog.path,
  });
}

export default function BlogPage() {
  const posts = getPosts(["src", "app", "blog", "posts"]);
  return (
    <>
      <StructuredData data={blogIndexSchemas(posts)} />
      <div style={{ position: "relative", minHeight: "100vh" }}>
        <Particle
          fill
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 0,
            pointerEvents: "none",
          }}
        />

        <Column maxWidth="xl" gap="xl" position="relative" zIndex={2}>
          <BlogClient posts={posts} />
        </Column>
      </div>
    </>
  );
}
