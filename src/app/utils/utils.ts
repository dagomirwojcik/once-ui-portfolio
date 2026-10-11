import fs from "fs";
import path from "path";
import matter from "gray-matter";

type Team = {
  name: string;
  role: string;
  avatar: string;
  linkedIn: string;
};

type Metadata = {
  title: string;
  publishedAt: string;
  summary: string;
  image?: string;
  images: string[];
  tag?: string;
  team: Team[];
  link?: string;
  featured?: boolean;
  // Album-specific fields
  coverImage?: string;
  category?: string;
  location?: string;
  date?: string;
};

function getMDXFiles(dir: string) {
  if (!fs.existsSync(dir)) {
    console.warn(`Directory does not exist: ${dir}`);
    return [];
  }

  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

function readMDXFile(filePath: string) {
  try {
    if (!fs.existsSync(filePath)) {
      console.warn(`File does not exist: ${filePath}`);
      return {
        metadata: {
          title: "",
          publishedAt: "",
          summary: "",
          image: "",
          images: [],
          tag: [],
          team: [],
          link: "",
          featured: false,
          coverImage: "",
          category: "",
          location: "",
          date: "",
        },
        content: ""
      };
    }

    const rawContent = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(rawContent);

    const metadata: Metadata = {
      title: data.title || "",
      publishedAt: data.publishedAt || "",
      summary: data.summary || "",
      image: data.image || "",
      images: data.images || [],
      tag: data.tag || [],
      team: data.team || [],
      link: data.link || "",
      featured: Boolean(data.featured),
      // Album-specific fields
      coverImage: data.coverImage || "",
      category: data.category || "",
      location: data.location || "",
      date: data.date || "",
    };

    return { metadata, content };
  } catch (error) {
    console.error(`Error reading MDX file ${filePath}:`, error);
    return {
      metadata: {
        title: "",
        publishedAt: "",
        summary: "",
        image: "",
        images: [],
        tag: [],
        team: [],
        link: "",
        featured: false,
        coverImage: "",
        category: "",
        location: "",
        date: "",
      },
      content: ""
    };
  }
}

function getMDXData(dir: string) {
  const mdxFiles = getMDXFiles(dir);
  return mdxFiles.map((file) => {
    const { metadata, content } = readMDXFile(path.join(dir, file));
    const slug = path.basename(file, path.extname(file));

    return {
      metadata,
      slug,
      content,
    };
  });
}

const POST_DIRECTORY_MAP: Record<string, string> = {
  "src/app/blog/posts": path.join(process.cwd(), "src", "app", "blog", "posts"),
  "src/app/work/projects": path.join(process.cwd(), "src", "app", "work", "projects"),
};

export function getPosts(customPath: readonly string[] = []) {
  try {
    const lookupKey = customPath.join("/");
    const postsDir = POST_DIRECTORY_MAP[lookupKey];

    if (!postsDir) {
      console.warn(`Unsupported post directory requested: ${lookupKey || "(default)"}`);
      return [];
    }

    return getMDXData(postsDir);
  } catch (error) {
    console.error(`Error getting posts from ${customPath.join("/")}:`, error);
    return [];
  }
}
