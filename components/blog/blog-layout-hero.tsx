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

export default function BlogLayoutHero({ slug }: { slug?: string }) {
  const t = useTranslations("blog");
  const locale = useLocale();

  const allCategories = BLOG_CATEGORIES.filter((category) => category !== "legal");
  const category = slug && allCategories.includes(slug) ? slug : "overview";

  // Category icon mapping
  const getCategoryIcon = (categorySlug: string) => {
    switch (categorySlug) {
      case "guides":
        return <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4" />;
      case "tutorials":
        return <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4" />;
      case "digital-marketing":
        return <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4" />;
      default:
        return <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4" />;
    }
  };

  console.log(category, slug);
  return (
    <Section className="py-10 sm:py-14 md:py-18 lg:py-24 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-gray-50/50 to-white">
      <div className="text-center mb-10 sm:mb-12">
        <H2 className="text-3xl sm:text-4xl md:text-5xl mb-4 font-bold">{t(`category.${category}.title`)}</H2>
        <Paragraph className="text-base sm:text-lg px-4 max-w-2xl mx-auto text-[#5C5B61]">
          {t(`category.${category}.description`)}
        </Paragraph>
      </div>

      {/* Category navigation */}
      <nav className="flex justify-center mb-10 sm:mb-12 px-4">
        <div className="inline-flex items-center bg-white rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm p-1.5 sm:p-2 overflow-x-auto max-w-full">
          <div className="flex gap-1 sm:gap-1.5">
            <CategoryLink
              title={t("category.overview.title")}
              href={getCanonicalLink(locale, "/articles")}
              active={!slug}
              icon={<BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
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
          "rounded-lg sm:rounded-xl px-3.5 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-1.5 sm:gap-2 whitespace-nowrap",
          active ? "bg-[#3970ff] text-white shadow-sm" : "text-[#5C5B61] hover:bg-gray-50 hover:text-[#08272E]"
        )}
      >
        {icon}
        <span>{title}</span>
      </div>
    </Link>
  );
};
