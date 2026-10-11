import { person, social, baseURL, schema as siteSchema } from "@/resources";

export type SchemaObject = Record<string, unknown>;

export const PERSON_ID = `${baseURL}/#person`;
export const WEBSITE_ID = `${baseURL}/#website`;

export function getSameAsLinks(): string[] {
  return social.filter((s) => Boolean(s.link)).map((s) => s.link as string);
}

export function toAbsoluteUrl(path: string): string {
  const normalizedBase = baseURL.endsWith("/") ? baseURL.slice(0, -1) : baseURL;
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${normalizedBase}${normalizedPath}`;
}

export function toAbsoluteImage(image?: string, fallbackTitle?: string): string {
  const normalizedBase = baseURL.endsWith("/") ? baseURL.slice(0, -1) : baseURL;
  if (image?.startsWith("http")) return image;
  if (image) return toAbsoluteUrl(image);
  if (fallbackTitle) {
    return `${normalizedBase}/og?title=${encodeURIComponent(fallbackTitle)}`;
  }
  return `${normalizedBase}${siteSchema.logo}`;
}

export function buildPerson(): SchemaObject {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": PERSON_ID,
    name: person.name,
    givenName: person.firstName,
    familyName: person.lastName,
    jobTitle: person.role,
    email: siteSchema.email,
    image: toAbsoluteImage(person.avatar),
    url: toAbsoluteUrl("/about"),
    sameAs: getSameAsLinks(),
    knowsLanguage: person.languages,
  };
}

export function buildWebSite(description: string, siteName?: string): SchemaObject {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: baseURL,
    name: siteName ?? `${person.name} » Portfolio`,
    description,
    publisher: { "@id": PERSON_ID },
    author: { "@id": PERSON_ID },
    image: toAbsoluteImage(siteSchema.logo),
    inLanguage: "en-GB",
    sameAs: getSameAsLinks(),
  };
}

export interface WebPageInput {
  path: string;
  title: string;
  description: string;
  image?: string;
  pageType?: string;
  datePublished?: string;
  dateModified?: string;
}

export function buildWebPage(input: WebPageInput): SchemaObject {
  const url = toAbsoluteUrl(input.path);
  return {
    "@context": "https://schema.org",
    "@type": input.pageType ?? "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: input.title,
    headline: input.title,
    description: input.description,
    image: toAbsoluteImage(input.image, input.title),
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": PERSON_ID },
    author: { "@id": PERSON_ID },
    publisher: { "@id": PERSON_ID },
    inLanguage: "en-GB",
    ...(input.datePublished && {
      datePublished: input.datePublished,
      dateModified: input.dateModified ?? input.datePublished,
    }),
  };
}

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export function buildBreadcrumbList(items: BreadcrumbItem[]): SchemaObject {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: toAbsoluteUrl(item.path),
    })),
  };
}

export interface ArticleInput {
  path: string;
  title: string;
  description: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  tags?: string | string[];
  articleType?: "BlogPosting" | "TechArticle" | "Article";
}

export function buildArticle(input: ArticleInput): SchemaObject {
  const url = toAbsoluteUrl(input.path);
  const tags = input.tags
    ? Array.isArray(input.tags)
      ? input.tags
      : [input.tags]
    : undefined;
  const articleType = input.articleType ?? "BlogPosting";

  return {
    "@context": "https://schema.org",
    "@type": articleType,
    "@id": `${url}#article`,
    mainEntityOfPage: { "@id": `${url}#webpage` },
    url,
    headline: input.title,
    name: input.title,
    description: input.description,
    image: toAbsoluteImage(input.image, input.title),
    datePublished: input.datePublished,
    dateModified: input.dateModified ?? input.datePublished,
    author: { "@id": PERSON_ID },
    publisher: {
      "@type": "Person",
      "@id": PERSON_ID,
      name: person.name,
      image: toAbsoluteImage(person.avatar),
    },
    inLanguage: "en-GB",
    isPartOf: { "@id": WEBSITE_ID },
    ...(tags && tags.length > 0 && { keywords: tags.join(", ") }),
  };
}

export interface ItemListEntry {
  name: string;
  path: string;
  description?: string;
  image?: string;
  datePublished?: string;
}

export function buildItemList(items: ItemListEntry[], listName: string): SchemaObject {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: listName,
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "ListItem",
        name: item.name,
        url: toAbsoluteUrl(item.path),
        ...(item.description && { description: item.description }),
        ...(item.image && { image: toAbsoluteImage(item.image) }),
        ...(item.datePublished && { datePublished: item.datePublished }),
      },
    })),
  };
}

export interface ImageGalleryInput {
  path: string;
  title: string;
  description: string;
  coverImage?: string;
  images: string[];
  datePublished?: string;
  location?: string;
}

export function buildImageGallery(input: ImageGalleryInput): SchemaObject {
  const url = toAbsoluteUrl(input.path);
  const imageObjects = input.images.map((src, index) => ({
    "@type": "ImageObject",
    name: `${input.title} - Image ${index + 1}`,
    contentUrl: toAbsoluteImage(src),
    thumbnailUrl: toAbsoluteImage(src),
  }));

  return {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "@id": `${url}#gallery`,
    url,
    name: input.title,
    description: input.description,
    image: input.coverImage
      ? toAbsoluteImage(input.coverImage)
      : imageObjects[0]?.contentUrl,
    author: { "@id": PERSON_ID },
    ...(input.datePublished && { datePublished: input.datePublished }),
    ...(input.location && {
      contentLocation: {
        "@type": "Place",
        name: input.location,
      },
    }),
    associatedMedia: imageObjects,
  };
}

export function buildResearchProject(input: {
  path: string;
  title: string;
  description: string;
  image?: string;
}): SchemaObject {
  const url = toAbsoluteUrl(input.path);
  return {
    "@context": "https://schema.org",
    "@type": "ResearchProject",
    "@id": `${url}#project`,
    url,
    name: input.title,
    description: input.description,
    image: toAbsoluteImage(input.image, input.title),
    author: { "@id": PERSON_ID },
    funder: {
      "@type": "CollegeOrUniversity",
      name: "Birmingham City University",
      url: "https://www.bcu.ac.uk",
    },
    keywords: [
      "microservices",
      "enterprise architecture",
      "TOGAF",
      "HL7",
      "FHIR",
      "healthcare",
      "GDPR",
    ].join(", "),
    inLanguage: "en-GB",
  };
}

export function withBaseEntities(
  schemas: SchemaObject[],
  siteDescription: string,
  siteName?: string,
): SchemaObject[] {
  return [buildPerson(), buildWebSite(siteDescription, siteName), ...schemas];
}
