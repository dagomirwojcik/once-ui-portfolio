import { getPosts } from "@/app/utils/utils";
import { baseURL, routes as routesConfig } from "@/resources";
import fs from "fs";
import path from "path";

export default async function sitemap() {
  const blogs = getPosts(["src", "app", "blog", "posts"]).map((post) => ({
    url: `${baseURL}/blog/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }));

  const works = getPosts(["src", "app", "work", "projects"]).map((post) => ({
    url: `${baseURL}/work/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }));

  const activeRoutes = Object.keys(routesConfig).filter((route) => routesConfig[route as keyof typeof routesConfig]);

  const routes = activeRoutes.map((route) => ({
    url: `${baseURL}${route !== "/" ? route : ""}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  // Helper to recursively get all image files in a directory
  function getAllImageFiles(dir: string): string[] {
    let results: string[] = [];
    const list = fs.readdirSync(dir);
    list.forEach((file) => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      if (stat && stat.isDirectory()) {
        results = results.concat(getAllImageFiles(filePath));
      } else if (/(\.avif|\.jpg|\.jpeg|\.png|\.webp|\.gif)$/i.test(file)) {
        results.push(filePath);
      }
    });
    return results;
  }

  // Get all images in public/images
  const imagesDir = path.join(process.cwd(), "public", "images");
  const imageFiles = fs.existsSync(imagesDir) ? getAllImageFiles(imagesDir) : [];
  const imageEntries = imageFiles.map((imgPath) => {
    const stat = fs.statSync(imgPath);
    // Get the URL relative to public
    const url = `${baseURL}/images/${path.relative(imagesDir, imgPath).replace(/\\/g, "/")}`;
    return {
      url,
      lastModified: stat.mtime.toISOString().split("T")[0],
    };
  });

  return [...routes, ...blogs, ...works, ...imageEntries];
}
