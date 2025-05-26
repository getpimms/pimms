import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { APP_URL } from "@/app/constants";

export function CallToAction() {
  const t = useTranslations("blog.cta");

  return (
    <div className="bg-[#3970ff] rounded-xl p-8 md:p-12 my-8 text-center">
      <h3 className="text-2xl md:text-3xl font-bold mb-3 text-white!">{t("readyToStart.title")}</h3>

      <p className="text-lg mb-8 max-w-2xl mx-auto text-white/90!">{t("readyToStart.description")}</p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href={`${APP_URL}/register`}
          className="inline-flex items-center justify-center gap-2 bg-white text-[#3970ff] font-semibold py-3 px-8 rounded-full hover:bg-gray-50 transition-colors text-base"
        >
          {t("readyToStart.startFreeTrial")}
          <ArrowRight className="w-4 h-4" />
        </Link>

        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 bg-transparent text-white! font-semibold py-3 px-8 rounded-full hover:bg-white/10 transition-colors border border-white/30 text-base"
        >
          {t("readyToStart.learnMore")}
        </Link>
      </div>
    </div>
  );
}
