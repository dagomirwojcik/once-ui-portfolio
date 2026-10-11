import {
  about,
  blog,
  contact,
  gallery,
  home,
  meta,
  person,
  work,
} from "@/resources";
import { galleryCategories } from "@/data/galleryData";
import type { ChangelogEntry } from "@/app/changelog/data";
import {
  buildArticle,
  buildBreadcrumbList,
  buildItemList,
  buildWebPage,
  withBaseEntities,
  type ItemListEntry,
} from "@/lib/structuredData";

export interface ContentPost {
  slug: string;
  metadata: {
    title: string;
    summary: string;
    publishedAt: string;
    image?: string;
    tag?: string | string[];
    images?: string[];
    coverImage?: string;
    location?: string;
    date?: string;
  };
}

function postToListItem(basePath: string, post: ContentPost): ItemListEntry {
  return {
    name: post.metadata.title,
    path: `${basePath}/${post.slug}`,
    description: post.metadata.summary,
    image: post.metadata.image,
    datePublished: post.metadata.publishedAt,
  };
}

function ogImage(title: string, description: string, type: string): string {
  return `/api/og/generate?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}&type=${type}`;
}

export function homePageSchemas() {
  return withBaseEntities(
    [
      buildWebPage({
        path: home.path,
        title: home.title,
        description: home.description,
        image: home.image,
      }),
    ],
    meta.home.description,
  );
}

export function aboutPageSchemas() {
  const image = ogImage(about.title, about.description, "about");
  return withBaseEntities(
    [
      buildWebPage({
        path: about.path,
        title: about.title,
        description: about.description,
        image,
        pageType: "ProfilePage",
      }),
      buildBreadcrumbList([
        { name: "Home", path: "/" },
        { name: "About", path: about.path },
      ]),
    ],
    about.description,
  );
}

export function workIndexSchemas(posts: ContentPost[]) {
  const image = ogImage(work.title, work.description, "work");
  const items = posts.map((p) => postToListItem(work.path, p));
  return withBaseEntities(
    [
      buildWebPage({
        path: work.path,
        title: work.title,
        description: work.description,
        image,
        pageType: "CollectionPage",
      }),
      buildItemList(items, `${person.name} — Projects`),
      buildBreadcrumbList([
        { name: "Home", path: "/" },
        { name: "Work", path: work.path },
      ]),
    ],
    work.description,
  );
}

export function workProjectSchemas(post: ContentPost) {
  const path = `${work.path}/${post.slug}`;
  const image =
    post.metadata.image ||
    ogImage(post.metadata.title, post.metadata.summary, "work");

  return withBaseEntities(
    [
      buildWebPage({
        path,
        title: post.metadata.title,
        description: post.metadata.summary,
        image,
        datePublished: post.metadata.publishedAt,
        dateModified: post.metadata.publishedAt,
      }),
      buildArticle({
        path,
        title: post.metadata.title,
        description: post.metadata.summary,
        image: post.metadata.image,
        datePublished: post.metadata.publishedAt,
        tags: post.metadata.tag,
        articleType: "TechArticle",
      }),
      buildBreadcrumbList([
        { name: "Home", path: "/" },
        { name: "Work", path: work.path },
        { name: post.metadata.title, path },
      ]),
    ],
    work.description,
  );
}

export function blogIndexSchemas(posts: ContentPost[]) {
  const image = ogImage(blog.title, blog.description, "blog");
  const items = posts.map((p) => postToListItem(blog.path, p));
  return withBaseEntities(
    [
      buildWebPage({
        path: blog.path,
        title: blog.title,
        description: blog.description,
        image,
        pageType: "CollectionPage",
      }),
      buildItemList(items, `${person.name} — Blog Posts`),
      buildBreadcrumbList([
        { name: "Home", path: "/" },
        { name: "Blog", path: blog.path },
      ]),
    ],
    blog.description,
  );
}

export function blogPostSchemas(post: ContentPost) {
  const path = `${blog.path}/${post.slug}`;
  const image =
    post.metadata.image ||
    ogImage(post.metadata.title, post.metadata.summary, "blog");

  return withBaseEntities(
    [
      buildWebPage({
        path,
        title: post.metadata.title,
        description: post.metadata.summary,
        image,
        datePublished: post.metadata.publishedAt,
        dateModified: post.metadata.publishedAt,
      }),
      buildArticle({
        path,
        title: post.metadata.title,
        description: post.metadata.summary,
        image: post.metadata.image,
        datePublished: post.metadata.publishedAt,
        tags: post.metadata.tag,
        articleType: "BlogPosting",
      }),
      buildBreadcrumbList([
        { name: "Home", path: "/" },
        { name: "Blog", path: blog.path },
        { name: post.metadata.title, path },
      ]),
    ],
    blog.description,
  );
}

export function galleryIndexSchemas() {
  const image = ogImage(gallery.title, gallery.description, "gallery");
  const items = galleryCategories.flatMap((category) =>
    category.albums
      .filter((album) => !album.hideFromGrid)
      .map((album) => ({
        name: album.title,
        path: gallery.path,
        description: album.summary,
        image: album.coverImage,
        datePublished: album.date,
      })),
  );

  return withBaseEntities(
    [
      buildWebPage({
        path: gallery.path,
        title: gallery.title,
        description: gallery.description,
        image,
        pageType: "CollectionPage",
      }),
      buildItemList(items, `${person.name} — Photo Gallery`),
      buildBreadcrumbList([
        { name: "Home", path: "/" },
        { name: "Gallery", path: gallery.path },
      ]),
    ],
    gallery.description,
  );
}

export function contactPageSchemas() {
  const image = ogImage(contact.title, contact.description, "contact");
  return withBaseEntities(
    [
      buildWebPage({
        path: contact.path,
        title: contact.title,
        description: contact.description,
        image,
        pageType: "ContactPage",
      }),
      buildBreadcrumbList([
        { name: "Home", path: "/" },
        { name: "Contact", path: contact.path },
      ]),
    ],
    contact.description,
  );
}

export function changelogPageSchemas(entries: ChangelogEntry[]) {
  const title = `${person.name} » Changelog`;
  const description = "Recent updates and changes to the portfolio";
  const image = ogImage("Changelog", description, "page");

  const versionItems: ItemListEntry[] = entries
    .filter((e) => e.version)
    .map((e) => ({
      name: e.version as string,
      path: "/changelog",
      description: e.focus ?? e.changes[0],
    }));

  return withBaseEntities(
    [
      buildWebPage({
        path: "/changelog",
        title,
        description,
        image,
      }),
      buildItemList(versionItems, "Portfolio Changelog Versions"),
      buildBreadcrumbList([
        { name: "Home", path: "/" },
        { name: "Changelog", path: "/changelog" },
      ]),
    ],
    meta.home.description,
  );
}

export function notFoundSchemas() {
  return withBaseEntities(
    [
      buildWebPage({
        path: "/404",
        title: "Page Not Found",
        description: "The page you are looking for does not exist.",
      }),
    ],
    meta.home.description,
  );
}
