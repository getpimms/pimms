import Script from "next/script";
import { PageMetadata } from "../../lib/mdx";
import { getCanonicalLink } from "../../lib/utils";
import { useLocale } from "next-intl";

const typeMap = {
  blog: "BlogPosting",
  guides: "TechArticle",
  tutorials: "Article",
  legal: "Article",
};

export const BlogStructuredData = ({
  metadata,
  url,
  author,
  type = "blog",
}: {
  metadata: PageMetadata;
  url: string;
  author?: { name: string; image: string; slug?: string };
  type?: string;
}) => {
  const locale = useLocale();

  const datePublished = metadata.publishedAt.includes("T")
    ? metadata.publishedAt
    : `${metadata.publishedAt}T00:00:00Z`;

  const dateModified = metadata.updatedAt.includes("T")
    ? metadata.updatedAt
    : `${metadata.updatedAt}T00:00:00Z`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": typeMap[type as keyof typeof typeMap] || "Article",
    headline: metadata.title,
    description: metadata.summary,
    image: metadata.image,
    url,
    datePublished,
    dateModified,
    author: {
      "@type": "Person",
      name: author?.name ?? "Unknown",
      ...(author?.slug && {
        url: getCanonicalLink(locale, `/articles/author/${author.slug}`),
      }),
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };

  return (
    <Script
      id="blog-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};
