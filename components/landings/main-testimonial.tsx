import { useTranslations } from "next-intl";
import { Avatar } from "@/components/base/avatar";
import { Star } from "lucide-react";
import { Paragraph } from "../base/paragraph";
import { Section } from "@/components/base/section";

export default function MainTestimonial({ tkey }: { tkey: string }) {
  const t = useTranslations(tkey);

  return (
    <Section id="main-testimonial">
      <div className="bg-white rounded-2xl border border-gray-200 p-8 lg:p-12 text-center max-w-3xl mx-auto">
        <div className="space-y-6">
          {/* Rating Stars */}
          <div className="flex justify-center gap-1">
            {Array.from({ length: 5 }, (_, index) => (
              <Star key={index} className="w-6 h-6 text-[#3970ff] fill-current" />
            ))}
          </div>
          {/* Testimonial Quote */}
          <div className="max-w-2xl mx-auto">
            <Paragraph className="text-xl text-[#08272E] font-medium">
              {t.rich("main_testimonial.text", {
                strong: (chunks) => <span className="font-bold text-[#3970ff]">{chunks}</span>
              })}
            </Paragraph>
          </div>
          {/* Author Section */}
          <div className="pt-4">
            <div className="flex items-center justify-center gap-4">
              <Avatar
                src={t("main_testimonial.author_avatar")}
                alt={t("main_testimonial.author_name")}
                className="w-14 h-14"
              />
              <div className="text-left">
                <p className="font-bold text-[#08272E] text-lg">{t("main_testimonial.author_name")}</p>
                <p className="text-[#5C5B61] text-sm">{t("main_testimonial.author_title")}</p>
              </div>
            </div>
          </div>
          {/* Trust indicators */}
          <div className="pt-2">
            <div className="inline-flex items-center text-xs font-semibold text-[#08272E] bg-gray-100 px-4 py-2 rounded-full uppercase tracking-wider">
              {t("main_testimonial.verified")}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
