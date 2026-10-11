import { notFound } from "next/navigation";
import { ScrollToHash } from "@/components";
import { CustomMDX } from "@/components/mdx";
import { Meta, AvatarGroup, Button, Column, Heading, HeadingNav, Icon, Row, Text } from "@once-ui-system/core";
import { StructuredData } from "@/components/seo/StructuredData";
import { blogPostSchemas } from "@/lib/pageSchemas";
import { baseURL, blog } from "@/resources";
import { formatDate } from "@/app/utils/formatDate";
import { getPosts } from "@/app/utils/utils";
import { Metadata } from 'next';
import styles from './BlogPost.module.scss';
import HideOnMobile from '@/components/HideOnMobile';



export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const posts = getPosts(["src", "app", "blog", "posts"]);
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

  const posts = getPosts(["src", "app", "blog", "posts"])
  let post = posts.find((post) => post.slug === slugPath);

  if (!post) return {};

  return Meta.generate({
    title: post.metadata.title,
    description: post.metadata.summary,
    baseURL: baseURL,
    image: post.metadata.image || `/api/og/generate?title=${encodeURIComponent(post.metadata.title)}&description=${encodeURIComponent(post.metadata.summary)}&type=blog`,
    path: `${blog.path}/${post.slug}`,
  });
}

export default async function Blog({
  params
}: { params: Promise<{ slug: string | string[] }> }) {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug) ? routeParams.slug.join('/') : routeParams.slug || '';

  let post = getPosts(["src", "app", "blog", "posts"]).find((post) => post.slug === slugPath);

  if (!post) {
    notFound();
  }

  const avatars =
    post.metadata.team?.map((person) => ({
      src: person.avatar,
    })) || [];

  return (
    <Row fillWidth>
      <HideOnMobile>
        <Column maxWidth={12} />
      </HideOnMobile>
      <Row fillWidth horizontal="center">
        <Column className={styles.mainSection} as="section" maxWidth="xs" gap="l">
          <StructuredData data={blogPostSchemas(post)} />
          <Button data-border="rounded" href="/blog" weight="default" variant="tertiary" size="s" prefixIcon="chevronLeft">
            Posts
          </Button>
          <Heading variant="display-strong-s">{post.metadata.title}</Heading>
          <Row gap="12" vertical="center">
            {avatars.length > 0 && <AvatarGroup size="s" avatars={avatars} />}
            <Text variant="body-default-s" onBackground="neutral-weak">
              {post.metadata.publishedAt && formatDate(post.metadata.publishedAt)}
            </Text>
          </Row>
          <Column as="article" fillWidth>
            <CustomMDX source={post.content} />
          </Column>
          <ScrollToHash />
        </Column>
    </Row>
    <HideOnMobile>
      <Column className={styles.tocContainer} maxWidth={12} paddingLeft="40" fitHeight position="sticky" top="80" gap="16">
        <HeadingNav fitHeight/>
      </Column>
    </HideOnMobile>
    </Row>
  );
}
