import { notFound } from "next/navigation";
import { formatDate, getPage, getPages } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote-client/rsc";
import { twMerge } from "tailwind-merge";
import { use } from "react";
import { locales } from "@/i18n/config";
import { useLocale } from "next-intl";
import { generatePagesMetadata, getCanonicalLink } from "@/lib/utils";
import { Section } from "@/components/base/section";
import Image from "next/image";
import Link from "next/link";
import { AUTHORS } from "../../../../../constants";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import TableOfContents from "@/components/table-of-content";
import remarkDirective from "remark-directive";
import { remarkIframeDirective } from "@/lib/mdx/remarkIframeDirective";
import { remarkFaqDirective } from "@/lib/mdx/remarkFaqDirective";
import { Faq } from "@/components/mdx/Faq";
import { CallToAction } from "@/components/mdx/CallToAction";
import { remarkCtaPlaceholder } from "@/lib/mdx/remarkCtaDirective";
import { BlogStructuredData } from "@/components/mdx/BlogStructuredData";
import { FaqStructuredData } from "@/components/mdx/FaqStructuredData";
import { InfoSection } from "@/components/mdx/InfoSection";
import { LinkCards } from "@/components/mdx/LinkCards";
import { LinkCard } from "@/components/mdx/LinkCards";
import { Quote } from "@/components/mdx/Quote";
import { Steps, Step, StepCompleted } from "@/components/mdx/Steps";
import { Highlight } from "@/components/mdx/Highlight";
import { remarkCustomDirectives } from "@/lib/mdx/remarkCustomDirectives";
import { Pre } from "@/components/mdx/Pre";
import { articleFolders } from "@/i18n/config";
import TallyIframe from "@/components/mdx/TallyIframe";
import { BreadcrumbStructuredData } from "@/components/mdx/BreadcrumbStructuredData";
import { Clock, ChevronRight } from "lucide-react";
import Author from "@/components/blog/author";
import { useTranslations } from "next-intl";

export async function generateStaticParams() {
  const allParams = [];

  for (const locale of locales) {
    const pages = getPages(locale, articleFolders);
    allParams.push(
      ...pages.map((page) => ({
        locale,
        slug: page.slug
      }))
    );
  }

  return allParams;
}

export async function generateMetadata({ params }: MetadataProps) {
  const { slug, locale } = await params;
  const post = getPage(locale, articleFolders, slug);

  if (!post) {
    return;
  }

  return generatePagesMetadata({
    params,
    dir: "articles",
    slug,
    metadata: post.metadata
  });
}

function MdxLink({ href, children }: { href?: string; children: React.ReactNode }) {
  const locale = useLocale();

  if (!href) {
    return <span>{children}</span>;
  }

  const isInternalLink = href.startsWith("/");

  if (isInternalLink) {
    return (
      <Link
        href={getCanonicalLink(locale, href)}
        className="text-blue-600 hover:text-blue-800 underline decoration-2 underline-offset-2 transition-colors duration-200 font-medium"
      >
        {children}
      </Link>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 hover:text-blue-800 underline decoration-2 underline-offset-2 hover:decoration-blue-800 transition-colors duration-200 font-medium inline-flex items-center gap-1"
    >
      {children}
    </a>
  );
}

type Props = {
  params: Promise<{ slug: string }>;
};

const components = {
  table: ({ children }: { children: React.ReactNode }) => (
    <div className="max-w-full overflow-x-auto my-4 sm:my-6 -mx-4 sm:mx-0">
      <table className="min-w-full border-collapse border border-gray-300 text-xs sm:text-sm">{children}</table>
    </div>
  ),
  img: ({ src, alt }: { src: string; alt: string }) => (
    <Image
      src={src}
      alt={alt}
      width={1200}
      height={630}
      className="block w-full rounded-none sm:rounded-xl border-0 sm:border-4 border-gray-100 shadow-md sm:shadow-lg hover:shadow-xl transition-shadow duration-300 my-4 sm:my-6 md:my-8 -mx-4 sm:mx-0"
    />
  ),
  a: MdxLink,
  Iframe: ({ src }: { src: string }) => {
    return (
      <div className="aspect-video w-full mb-4 sm:mb-6 md:mb-8 rounded-none sm:rounded-xl overflow-hidden border-0 sm:border-2 border-gray-200 shadow-md sm:shadow-lg -mx-4 sm:mx-0">
        <iframe src={src} className="w-full h-full" allowFullScreen />
      </div>
    );
  },
  Faq: ({ question, children }: { question: string; children: React.ReactNode }) => (
    <Faq question={question}>{children}</Faq>
  ),
  CallToAction,
  InfoSection,
  LinkCards,
  LinkCard,
  Quote,
  Steps,
  Step,
  StepCompleted,
  Highlight,
  pre: Pre,
  Tally: TallyIframe
};

export default function BlogPost({ params }: Props) {
  const { slug } = use(params);
  const locale = useLocale();
  const post = getPage(locale, articleFolders, slug);
  const t = useTranslations("blog.post");

  const relatedArticles =
    (post.metadata.related && post.metadata.related.map((slug: string) => getPage(locale, articleFolders, slug))) || [];

  if (!post) {
    notFound();
  }

  const author = AUTHORS.find((author) => author.slug === post.metadata.author);

  return (
    <>
      {/* Header section */}
      <Section className="py-8 sm:py-12 md:py-16 px-4 md:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-[#5C5B61] mb-4 sm:mb-6 overflow-x-auto">
          <Link
            href={getCanonicalLink(locale, "/articles")}
            className="hover:text-[#08272E] transition-colors whitespace-nowrap"
          >
            {t("breadcrumb.articles")}
          </Link>
          <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
          {post.metadata.categories.map((category: string, index: number) => (
            <span key={category} className="flex items-center gap-1.5 sm:gap-2">
              <Link
                href={getCanonicalLink(locale, `/articles/category/${category}`)}
                className="hover:text-[#08272E] transition-colors capitalize whitespace-nowrap"
              >
                {category.replace("-", " ")}
              </Link>
              {index < post.metadata.categories.length - 1 && (
                <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
              )}
            </span>
          ))}
        </nav>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#08272E] mb-3 sm:mb-4 max-w-4xl">
          {post.metadata.title}
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-[#5C5B61] mb-4 sm:mb-6 max-w-3xl">{post.metadata.summary}</p>

        {/* Meta info */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-xs sm:text-sm text-[#5C5B61]">
          {author && (
            <div className="flex items-center gap-2">
              <Author username={author.slug} size="sm" />
            </div>
          )}
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>{formatDate(post.metadata.publishedAt)}</span>
          </div>
          <span>5 {t("minRead")}</span>
        </div>
      </Section>

      {/* Main content */}
      <Section className="py-8 sm:py-12 md:py-16 bg-gray-50 px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8 max-w-6xl mx-auto">
          <article className="lg:col-span-3">
            <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 p-4 sm:p-6 md:p-8 lg:p-12">
              {post.metadata.image && (
                <div className="mb-6 sm:mb-8 -mx-4 sm:-mx-6 md:-mx-8 lg:mx-0">
                  <Image
                    className="w-full rounded-none sm:rounded-xl"
                    src={post.metadata.image}
                    alt={post.metadata.title}
                    width={1200}
                    height={630}
                    priority
                  />
                </div>
              )}

              <div
                className={twMerge(
                  "prose prose-sm sm:prose-base lg:prose-lg max-w-none",
                  "prose-h2:text-xl sm:prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-6 sm:prose-h2:mt-8 prose-h2:mb-3 sm:prose-h2:mb-4 prose-h2:text-[#08272E]",
                  "prose-h3:text-lg sm:prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-4 sm:prose-h3:mt-6 prose-h3:mb-2 sm:prose-h3:mb-3 prose-h3:text-[#08272E]",
                  "prose-p:text-[#5C5B61] prose-p:leading-relaxed prose-p:mb-3 sm:prose-p:mb-4",
                  "prose-ul:my-3 sm:prose-ul:my-4 prose-ol:my-3 sm:prose-ol:my-4",
                  "prose-li:text-[#5C5B61] prose-li:mb-1.5 sm:prose-li:mb-2",
                  "prose-code:text-xs sm:prose-code:text-sm prose-code:px-1.5 sm:prose-code:px-2 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none",
                  "prose-blockquote:border-l-4 prose-blockquote:border-[#3970ff] prose-blockquote:bg-gray-50 prose-blockquote:p-3 sm:prose-blockquote:p-4 prose-blockquote:my-4 sm:prose-blockquote:my-6 prose-blockquote:italic",
                  "prose-a:text-[#3970ff] prose-a:no-underline hover:prose-a:underline",
                  "prose-strong:font-semibold prose-strong:text-[#08272E]"
                )}
              >
                <MDXRemote
                  source={post.content}
                  components={components}
                  options={{
                    mdxOptions: {
                      remarkPlugins: [
                        remarkGfm,
                        remarkDirective,
                        remarkIframeDirective,
                        remarkFaqDirective,
                        remarkCtaPlaceholder,
                        remarkCustomDirectives
                      ],
                      rehypePlugins: [
                        rehypeSlug,
                        rehypeAutolinkHeadings,
                        [
                          rehypePrettyCode,
                          {
                            theme: "github-light",
                            keepBackground: false
                          }
                        ]
                      ]
                    }
                  }}
                />
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-4 sm:top-8 bg-white rounded-xl sm:rounded-2xl border border-gray-200 p-4 sm:p-6">
              {author && (
                <>
                  <div className="mb-4 sm:mb-6">
                    <h3 className="text-xs font-semibold text-[#08272E] uppercase tracking-wide mb-3 sm:mb-4">
                      {t("writtenBy")}
                    </h3>
                    <div className="flex items-center gap-3">
                      <img
                        alt={`${author.name} avatar`}
                        loading="lazy"
                        width="36"
                        height="36"
                        className="rounded-full w-9 h-9 sm:w-10 sm:h-10"
                        src={author.image}
                      />
                      <div>
                        <p className="text-sm sm:text-base font-semibold text-[#08272E]">{author.name}</p>
                        <p className="text-xs sm:text-sm text-[#5C5B61]">{author.role}</p>
                      </div>
                    </div>
                  </div>
                  <hr className="border-gray-200 mb-4 sm:mb-6" />
                </>
              )}

              <div>
                <h3 className="text-xs font-semibold text-[#08272E] uppercase tracking-wide mb-3 sm:mb-4">
                  {t("tableOfContents")}
                </h3>
                <TableOfContents content={post.content} />
              </div>
            </div>
          </aside>
        </div>
      </Section>

      {relatedArticles.length > 0 && (
        <Section className="py-8 sm:py-12 md:py-16 px-4 md:px-6 lg:px-8">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-[#08272E] mb-1.5 sm:mb-2">{t("continueReading")}</h2>
            <p className="text-sm sm:text-base text-[#5C5B61]">{t("exploreMore")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {relatedArticles.map((post) => (
              <Link
                key={post.slug}
                href={getCanonicalLink(locale, `/articles/${post.slug}`)}
                className="group block bg-white border border-gray-200 rounded-lg sm:rounded-2xl overflow-hidden hover:border-gray-300 transition-all duration-200"
              >
                <div className="relative overflow-hidden">
                  <Image
                    className="w-full h-full object-cover aspect-[1200/630] group-hover:scale-105 transition-transform duration-200"
                    src={post.metadata.image}
                    alt={post.metadata.title}
                    width={1200}
                    height={630}
                  />
                </div>

                <div className="p-4 sm:p-6">
                  <h3 className="font-bold text-base sm:text-lg text-[#08272E] group-hover:text-[#3970ff] transition-colors mb-1.5 sm:mb-2">
                    {post.metadata.title}
                  </h3>
                  <p className="text-[#5C5B61] line-clamp-3 mb-2 sm:mb-3 text-xs sm:text-sm">{post.metadata.summary}</p>
                  <p className="text-xs text-[#5C5B61]">{formatDate(post.metadata.updatedAt)}</p>
                </div>
              </Link>
            ))}
          </div>
        </Section>
      )}

      <BreadcrumbStructuredData slug={slug} category={post.metadata.categories[0]} metadata={post.metadata} />
      <BlogStructuredData
        type={post.dir}
        metadata={post.metadata}
        url={getCanonicalLink(locale, `/articles/${slug}`)}
        author={author}
      />
      <FaqStructuredData url={getCanonicalLink(locale, `/articles/${slug}`)} faqs={post.faqs} />
    </>
  );
}
