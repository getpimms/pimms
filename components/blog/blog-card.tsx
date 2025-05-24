import Image from "next/image";
import Link from "next/link";
import { formatDate, PageMetadata } from "@/lib/mdx";
import Author from "./author";
import { notFound } from "next/navigation";
import { getCanonicalLink } from "../../lib/utils";
import { useLocale } from "next-intl";
import { Clock, ArrowUpRight } from "lucide-react";

export default function BlogCard({ slug, metadata }: { slug: string; metadata: PageMetadata; priority?: boolean }) {
  const locale = useLocale();

  if (!metadata || !slug) {
    return notFound();
  }

  const { title, summary, image, author, publishedAt } = metadata;

  return (
    <Link
      href={getCanonicalLink(locale, `/articles/${slug}`)}
      className="group block bg-white border border-gray-200 rounded-lg overflow-hidden hover:border-gray-300 transition-all duration-200"
    >
      <div className="relative overflow-hidden">
        <Image
          className="w-full h-full object-cover aspect-[1200/630] group-hover:scale-105 transition-transform duration-200"
          src={image}
          alt={title}
          width={1200}
          height={630}
        />
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[#3970ff] text-xs font-medium px-2.5 py-1 rounded-full capitalize">
          {/* Category badge */}
          {metadata.categories[0].replace("-", " ")}
        </div>
      </div>

      <div className="p-4 sm:p-5 md:p-6">
        <h3 className="font-semibold text-base sm:text-lg text-[#08272E] group-hover:text-[#3970ff] transition-colors line-clamp-2 mb-2">
          {title}
        </h3>

        <p className="text-sm sm:text-base text-[#5C5B61] line-clamp-2 mb-3 sm:mb-4">{summary}</p>

        <div className="flex items-center justify-between text-xs sm:text-sm text-[#5C5B61]">
          <div className="flex items-center gap-2 sm:gap-3">
            {author && <Author username={author} imageOnly size="sm" noLink />}
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>{formatDate(publishedAt)}</span>
            </div>
          </div>
          <ArrowUpRight className="w-4 h-4 text-[#3970ff] opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>
    </Link>
  );
}
