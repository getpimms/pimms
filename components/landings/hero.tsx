import { useTranslations } from "next-intl";
import { H1, H1Subtitle } from "@/components/base/h1";
import { HeroSection } from "@/components/base/hero-section";
import { Check } from "lucide-react";
import { Paragraph } from "../base/paragraph";

export const Hero = ({ tkey, showBenefits = false }: { tkey: string; showBenefits?: boolean }) => {
  const t = useTranslations(tkey);

  return (
    <HeroSection>
      <div className="text-center space-y-6">
        <H1>
          {t.rich("hero.title", {
            primary: (chunks) => <span className="text-blue-600">{chunks}</span>
          })}
        </H1>
        <H1Subtitle>{t("hero.subtitle")}</H1Subtitle>
        {showBenefits && (
          <div className="max-w-2xl mx-auto mt-8">
            <div className="bg-white border border-gray-200 p-6 rounded-3xl">
              <div className="grid gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-5 h-5 bg-blue-600 flex items-center justify-center mt-0.5 rounded-full">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <Paragraph className="text-gray-900 text-left">{t(`hero.benefits.${i}`)}</Paragraph>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </HeroSection>
  );
};
