import { notFound } from "next/navigation";
import { formatDate, getPage, getPages } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote-client/rsc";
import { twMerge } from "tailwind-merge";
import { use } from "react";
import { locales } from "@/i18n/config";
import { useLocale } from "next-intl";
import { generatePagesMetadata, getCanonicalLink } from "@/lib/utils";
import { H1Blog } from "@/components/base/h1";
import { HeroSection } from "@/components/base/hero-section";
import { Section } from "@/components/base/section";
import { Paragraph } from "@/components/base/paragraph";
import { Label } from "@/components/base/label";
import Image from "next/image";
import Link from "next/link";
import { H2 } from "@/components/base/h2";
import { List } from "@/components/base/list";
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

export async function generateStaticParams() {
  const allParams = [];

  for (const locale of locales) {
    const pages = getPages(locale, "blog");
    allParams.push(
      ...pages.map((page) => ({
        locale,
        slug: page.slug,
      }))
    );
  }

  return allParams;
}

export async function generateMetadata({ params }: MetadataProps) {
  const { slug, locale } = await params;
  const post = getPage(locale, "blog", slug);

  if (!post) {
    return;
  }

  return generatePagesMetadata({
    params,
    dir: "blog",
    slug,
    metadata: post.metadata,
  });
}

function MdxLink({
  href,
  children,
}: {
  href?: string;
  children: React.ReactNode;
}) {
  const locale = useLocale();

  if (!href) {
    return <span>{children}</span>;
  }

  const isInternalLink = href.startsWith("/");

  if (isInternalLink) {
    return (
      <Link href={getCanonicalLink(locale, href)} className="underline">
        {children}
      </Link>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="underline"
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
    <div className="max-w-screen overflow-scroll">
      <table className="w-full">{children}</table>
    </div>
  ),
  img: ({ src, alt }: { src: string; alt: string }) => (
    <Image
      src={src}
      alt={alt}
      width={1200}
      height={630}
      className="rounded-xl border-[6px] border-[#F2F3F5]"
    />
  ),
  a: MdxLink,
  Iframe: ({ src }: { src: string }) => {
    return (
      <div className="aspect-video w-full mb-6">
        <iframe src={src} className="w-full h-full" allowFullScreen />
      </div>
    );
  },
  Faq: ({
    question,
    children,
  }: {
    question: string;
    children: React.ReactNode;
  }) => <Faq question={question}>{children}</Faq>,
  CallToAction,
};

export default function BlogPost({ params }: Props) {
  const { slug } = use(params);
  const locale = useLocale();
  const post = getPage(locale, "blog", slug);

  const relatedArticles =
    (post.metadata.related &&
      post.metadata.related.map((slug: string) =>
        getPage(locale, "blog", slug)
      )) ||
    [];

  if (!post) {
    notFound();
  }

  const author = AUTHORS.find((author) => author.slug === post.metadata.author);

  return (
    <>
      <HeroSection className="flex flex-col items-start justify-left gap-2 mb-0 md:my-0 md:mt-16">
        <div className="flex flex-wrap gap-2 items-center mx-auto mb-6">
          {post.metadata.categories.map((category: string) => (
            <Link
              key={category}
              href={getCanonicalLink(locale, `/blog/category/${category}`)}
            >
              <Label className="text-sm text-left capitalize bg-white text-[#08272E] border-[3px] border-[#3970ff] px-2.5 py-1.5 cursor-pointer">
                {category}
              </Label>
            </Link>
          ))}
          <Paragraph>{formatDate(post.metadata.updatedAt)}</Paragraph>
        </div>
        <H1Blog>{post.metadata.title}</H1Blog>
        <div className="px-4 text-center mx-auto max-w-2xl">
          <Paragraph>{post.metadata.summary}</Paragraph>
        </div>
      </HeroSection>

      <Section
        id="content"
        className="w-full mx-0 sm:mx-auto relative overflow-x-hidden sm:overflow-x-visible"
      >
        <div className="hidden absolute top-52 h-[calc(100%-13rem)] w-full rounded-2xl bg-gradient-to-b from-[white] md:block" />
        <div className="mx-auto w-full grid max-w-screen-lg grid-cols-4 gap-5 px-0 md:pt-10 xl:px-0">
          <article className="bg-card w-full flex flex-col items-start gap-4 md:mt-8 rounded-3xl relative col-span-4 sm:rounded-2xl sm:border-[6px] sm:border-[#F2F3F5] md:col-span-3">
            <Image
              className="aspect-[1200/630] rounded-t-xl object-cover"
              src={post.metadata.image}
              alt={post.metadata.title}
              width={1200}
              height={630}
              priority
            />
            <div
              className={twMerge(
                "flex flex-col w-full px-4 md:px-8 py-4 max-w-4xl mx-auto",
                // h2: text-2xl font-bold mt-4
                "prose prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-8",
                // h3: text-xl font-semibold mt-4
                "prose prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-4",
                // h4: text-lg font-medium mt-4
                "prose prose-h4:text-lg prose-h4:font-medium prose-h4:mt-4",
                // p: text-md md:text-lg leading-relaxed text-balance text-[#5C5B61]
                "prose-p:text-md prose-p:leading-relaxed sm:prose-p:text-balance prose-p:text-[#5C5B61] prose-p:my-2",
                // ul: list-disc list-inside
                "prose-ul:list-disc prose-ul:list-inside prose-ul:my-1 prose-ul:pl-1",
                // li: text-md md:text-lg leading-relaxed text-balance text-[#5C5B61]
                "prose-li:leading-relaxed sm:prose-li:text-balance prose-li:text-[#5C5B61]",
                // code: text-md md:text-lg leading-relaxed text-balance text-[#5C5B61]
                "prose-code:text-sm prose-code:before:content-none prose-code:after:content-none prose-code:font-normal prose-code:font-mono prose-code:rounded-md prose-code:p-1",
                // figure: p-0 m-0
                "prose-figure:my-4"
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
                    ],
                    rehypePlugins: [
                      rehypeSlug,
                      rehypeAutolinkHeadings,
                      [
                        rehypePrettyCode,
                        {
                          theme: "one-light",
                        },
                      ],
                    ],
                  },
                }}
              />
            </div>
          </article>
          <aside className="col-span-4 md:col-span-1 hidden sm:block md:mx-0 md:mt-40">
            <div className="sticky top-0 flex flex-col max-h-[calc(100vh - 6rem)] overflow-hidden">
              {author && (
                <div className="flex flex-col gap-y-4 py-5">
                  <Paragraph>Written by</Paragraph>
                  <a
                    className="group flex items-center space-x-3"
                    href={getCanonicalLink(
                      locale,
                      `/blog/author/${author.slug}`
                    )}
                  >
                    <img
                      alt={`${author.name} avatar`}
                      loading="lazy"
                      width="36"
                      height="36"
                      decoding="async"
                      data-nimg="1"
                      className="blur-0 rounded-full transition-all group-hover:brightness-90"
                      src={author.image}
                    />
                    <div className="flex flex-col">
                      <Paragraph className="font-medium text-[#08272E] capitalize">
                        {author.name}
                      </Paragraph>
                      <Paragraph size="sm">{author.role}</Paragraph>
                    </div>
                  </a>
                </div>
              )}
              <hr className="w-full border-[3px] border-gray-100" />
              <div className="col-span-1 self-start pb-8 pt-4 mr-4">
                <div className="max-h-[80vh] overflow-y-auto pb-8 pr-4">
                  <TableOfContents content={post.content} />
                </div>
              </div>
            </div>
          </aside>
        </div>
      </Section>
      <Section className="mx-auto w-fit">
        <Paragraph className="text-semibold">
          First published at: {formatDate(post.metadata.publishedAt)}
        </Paragraph>
      </Section>
      <Section className="mx-auto w-fit">
        {relatedArticles.length > 0 && (
          <div className="flex flex-col space-y-4 py-5">
            <H2 className="text-center">Read more</H2>
            <List className="gap-y-6">
              {relatedArticles.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group flex flex-col items-center gap-4 sm:flex-row bg-card border-[6px] border-[#F2F3F5] rounded-2xl p-3"
                  >
                    <Image
                      className="blur-0 aspect-video w-full rounded-2xl sm:w-[200px]"
                      src={post.metadata.image}
                      alt={post.metadata.title}
                      width={1200}
                      height={630}
                      priority
                    />
                    <div className="group flex flex-col space-y-2">
                      <p className="font-semibold text-gray-700 underline-offset-4 group-hover:underline">
                        {post.metadata.title}
                      </p>
                      <p className="line-clamp-2 text-sm text-gray-500 underline-offset-2 group-hover:underline">
                        {post.metadata.summary}
                      </p>
                      <p className="text-xs text-gray-400 underline-offset-2 group-hover:underline">
                        {formatDate(post.metadata.updatedAt)}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </List>
          </div>
        )}
      </Section>
      <BlogStructuredData
        metadata={post.metadata}
        url={getCanonicalLink(locale, `/blog/${slug}`)}
        author={author}
      />
      <FaqStructuredData
        url={getCanonicalLink(locale, `/blog/${slug}`)}
        faqs={post.faqs}
      />
    </>
  );
}
