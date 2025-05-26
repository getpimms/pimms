import { BookOpen, Users, TrendingUp } from "lucide-react";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { BLOG_CATEGORIES } from "../../app/constants";
import { getCanonicalLink } from "../../lib/utils";
import { useLocale } from "next-intl";
import { useTranslations } from "next-intl";
import { Section } from "../base/section";
import { H2 } from "../base/h2";
import { Paragraph } from "../base/paragraph";

export default function BlogLayoutHero({ slug }: { slug: string }) {
  const t = useTranslations("blog");
  const tStats = useTranslations("blog.stats");
  const locale = useLocale();

  const allCategories = BLOG_CATEGORIES.filter((category) => category !== "legal");
  const category = slug && allCategories.includes(slug) ? slug : "overview";

  // Category icon mapping
  const getCategoryIcon = (categorySlug: string) => {
    switch (categorySlug) {
      case "guides":
        return <BookOpen className="w-3 h-3 sm:w-4 sm:h-4" />;
      case "tutorials":
        return <Users className="w-3 h-3 sm:w-4 sm:h-4" />;
      case "digital-marketing":
        return <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />;
      default:
        return <BookOpen className="w-3 h-3 sm:w-4 sm:h-4" />;
    }
  };

  return (
    <Section className="py-8 sm:py-12 md:py-16 lg:py-24 px-4 md:px-6 lg:px-8">
      <div className="text-center mb-8 sm:mb-12">
        <H2 className="text-3xl sm:text-4xl md:text-5xl mb-3 sm:mb-4">{t(`category.${category}.title`)}</H2>
        <Paragraph className="text-base sm:text-lg px-4 max-w-2xl mx-auto">
          {t(`category.${category}.description`)}
        </Paragraph>
      </div>

      {/* Category navigation */}
      <nav className="flex justify-center mb-8 sm:mb-12 px-4">
        <div className="inline-flex items-center bg-white rounded-lg sm:rounded-2xl border border-gray-200 p-1 sm:p-2 overflow-x-auto max-w-full">
          <div className="flex gap-1 sm:gap-2">
            <CategoryLink
              title={t("category.overview.title")}
              href={getCanonicalLink(locale, "/articles")}
              active={!slug}
              icon={<BookOpen className="w-3 h-3 sm:w-4 sm:h-4" />}
            />
            {allCategories.map((category) => (
              <CategoryLink
                key={category}
                title={t(`category.${category}.title`)}
                href={getCanonicalLink(locale, `/articles/category/${category}`)}
                active={category === slug}
                icon={getCategoryIcon(category)}
              />
            ))}
          </div>
        </div>
      </nav>

      {/* Stats section */}
      <div className="flex items-center justify-center gap-6 sm:gap-8 md:gap-12 text-xs sm:text-sm text-[#5C5B61]">
        <div className="text-center">
          <div className="text-xl sm:text-2xl font-bold text-[#08272E] mb-1">30+</div>
          <div>{tStats("articles")}</div>
        </div>
        <div className="text-center">
          <div className="text-xl sm:text-2xl font-bold text-[#08272E] mb-1">{tStats("weekly")}</div>
          <div>{tStats("updates")}</div>
        </div>
      </div>
    </Section>
  );
}

const CategoryLink = ({
  title,
  href,
  active,
  icon
}: {
  title: string;
  href: string;
  active?: boolean;
  icon?: React.ReactNode;
}) => {
  return (
    <Link href={href}>
      <div
        className={twMerge(
          "rounded-lg sm:rounded-xl px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium transition-colors flex items-center gap-1.5 sm:gap-2 whitespace-nowrap",
          active ? "bg-[#3970ff] text-white" : "text-[#5C5B61] hover:bg-gray-50"
        )}
      >
        {icon}
        <span>{title}</span>
      </div>
    </Link>
  );
};
