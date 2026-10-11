import { notFound } from "next/navigation";
import { getPosts } from "@/app/utils/utils";
import { Meta, AvatarGroup, Button, Column, Flex, Heading, Media, Text } from "@once-ui-system/core";
import { StructuredData } from "@/components/seo/StructuredData";
import { workProjectSchemas } from "@/lib/pageSchemas";
import { baseURL, work } from "@/resources";
import { formatDate } from "@/app/utils/formatDate";
import { ScrollToHash } from "@/components";
import { CustomMDX } from "@/components/mdx";
import { Metadata } from "next";
import styles from './WorkPost.module.scss';



export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const posts = getPosts(["src", "app", "work", "projects"]);
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string | string[] }>;
}): Promise<Metadata> {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug) ? routeParams.slug.join('/') : routeParams.slug || '';

  const posts = getPosts(["src", "app", "work", "projects"])
  let post = posts.find((post) => post.slug === slugPath);

  if (!post) return {};

  return Meta.generate({
    title: post.metadata.title,
    description: post.metadata.summary,
    baseURL: baseURL,
    image: post.metadata.image || `/api/og/generate?title=${encodeURIComponent(post.metadata.title)}&description=${encodeURIComponent(post.metadata.summary)}&type=work`,
    path: `${work.path}/${post.slug}`,
  });
}

export default async function Project({
  params
}: { params: Promise<{ slug: string | string[] }> }) {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug) ? routeParams.slug.join('/') : routeParams.slug || '';

  let post = getPosts(["src", "app", "work", "projects"]).find((post) => post.slug === slugPath);

  if (!post) {
    notFound();
  }


  // Process team avatars to handle both src and value
  const avatars = post.metadata.team?.map((person) => {
    // Check if avatar looks like initials (1-3 characters, no URL/path)
    if (typeof person.avatar === 'string' && 
        person.avatar.length <= 3 && 
        !person.avatar.startsWith('http') && 
        !person.avatar.startsWith('/') &&
        !person.avatar.includes('.')) {
      return { value: person.avatar };
    }
    // Otherwise treat as image source
    return { src: person.avatar };
  }) || [];

  return (
    <Column as="section" maxWidth="m" horizontal="center" gap="l">
      <StructuredData data={workProjectSchemas(post)} />
      <Column className={styles.mainSection} maxWidth="xs" gap="16">
        <Button data-border="rounded" href="/work" variant="tertiary" weight="default" size="s" prefixIcon="chevronLeft">
          Projects
        </Button>
        <Heading variant="display-strong-s">{post.metadata.title}</Heading>
      </Column>
      {post.metadata.images.length > 0 && (
        <Media
          priority
          aspectRatio="16 / 9"
          radius="m"
          alt="image"
          src={post.metadata.images[0]}
        />
      )}
      <Column style={{ margin: "auto" }} as="article" maxWidth="xs">
        <Flex gap="12" marginBottom="24" vertical="center">
          {post.metadata.team && <AvatarGroup reverse avatars={avatars} size="m" />}
          <Text variant="body-default-s" onBackground="neutral-weak">
            {post.metadata.publishedAt && formatDate(post.metadata.publishedAt)}
          </Text>
        </Flex>
        <CustomMDX source={post.content} />
      </Column>
      <ScrollToHash />
    </Column>
  );
}
