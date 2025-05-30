import { writeFileSync } from "fs";
import path from "path";
import { getPages } from "@/lib/mdx";
import {
  articleFolders,
  ArticleFolders,
  locales,
  translationFolders,
} from "@/i18n/config";
import { basePathnames } from "@/i18n/basePathnames";

async function generatePathnames() {
  const result: Record<string, Record<string, string>> = {};

  // Track latest update dates
  const latestByCategory: Record<string, Date> = {};
  const latestByAuthor: Record<string, Date> = {};
  let latestArticleDate = new Date(0);

  // 1. Start by adding static basePathnames
  for (const sharedKey in basePathnames) {
    result[sharedKey] = {};

    for (const locale of locales) {
      result[sharedKey][locale] =
        basePathnames[sharedKey as keyof typeof basePathnames][locale] ||
        sharedKey;
    }

    // Default lastmod (can be overwritten later)
    result[sharedKey]["lastmod"] = new Date().toISOString();
  }

  // 2. Add dynamic pages (blog, guides, tutorials)
  for (const locale of locales) {
    const pages = getPages(locale, articleFolders);

    for (const page of pages) {
      const baseFolder = (page.metadata.categories.find((cat: string) =>
        articleFolders.includes(cat as ArticleFolders)
      ) || "blog") as ArticleFolders;

      const localizedPath = `/${translationFolders[locale][baseFolder]}/${page.metadata.slug}`;
      const sharedKey = `/articles/${page.slug}`;

      if (!result[sharedKey]) {
        result[sharedKey] = {};
      }

      result[sharedKey][locale] = localizedPath;
      result[sharedKey]["lastmod"] = page.metadata.updatedAt
        ? new Date(page.metadata.updatedAt).toISOString()
        : new Date().toISOString();

      // Track latest article date
      const updatedAt = page.metadata.updatedAt
        ? new Date(page.metadata.updatedAt)
        : new Date();
      if (updatedAt > latestArticleDate) {
        latestArticleDate = updatedAt;
      }

      // Track latest per category
      for (const cat of page.metadata.categories) {
        if (!latestByCategory[cat] || updatedAt > latestByCategory[cat]) {
          latestByCategory[cat] = updatedAt;
        }
      }

      // Track latest per author
      const author = page.metadata.author;
      if (author) {
        if (!latestByAuthor[author] || updatedAt > latestByAuthor[author]) {
          latestByAuthor[author] = updatedAt;
        }
      }
    }
  }

  // 3. Patch lastmod for special routes
  for (const sharedKey in result) {
    // Articles root
    if (sharedKey === "/articles") {
      result[sharedKey]["lastmod"] = latestArticleDate.toISOString();
      continue;
    }

    // Category pages
    if (sharedKey.startsWith("/articles/category/")) {
      const cat = sharedKey.split("/").pop();
      if (cat && latestByCategory[cat]) {
        result[sharedKey]["lastmod"] = latestByCategory[cat].toISOString();
      }
    }

    // Author pages
    if (sharedKey.startsWith("/articles/author/")) {
      const author = sharedKey.split("/").pop();
      if (author && latestByAuthor[author]) {
        result[sharedKey]["lastmod"] = latestByAuthor[author].toISOString();
      }
    }
  }

  // 4. Write file
  const fileContent = `export const pathnames: Record<string, Record<string, string>> = ${JSON.stringify(
    result,
    null,
    2
  )} as const;\n`;

  const targetPath = path.resolve(__dirname, "../i18n/pathnames.ts");
  writeFileSync(targetPath, fileContent);

  console.log("✅ Generated pathnames in:", targetPath);
}

generatePathnames().catch((err) => {
  console.error("❌ Failed to generate pathnames:", err);
  process.exit(1);
});
