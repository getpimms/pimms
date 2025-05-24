import BouncingImages from "@/components/landings/BouncingImages";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Section } from "@/components/base/section";
import { H2 } from "@/components/base/h2";
import CtaButtonBig from "@/components/cta/CtaButtonBig";
import { Zap } from "lucide-react";
import { Paragraph } from "../base/paragraph";

export const FreeOffer = ({ tkey, type }: { tkey: string; type: "sales" | "youtube" }) => {
  const tcommon = useTranslations("landing.common");
  const t = useTranslations(tkey);

  return (
    <Section id="free">
      <div className="bg-white rounded-2xl border border-gray-200 p-8 lg:p-12 flex flex-col lg:flex-row items-center gap-8">
        <div className="flex-1 space-y-6 text-center lg:text-left">
          <H2 className="text-left">
            {t.rich("free_offer.title", {
              logo: () => (
                <Image
                  src="/static/logo.svg"
                  alt="PIMMS"
                  className="w-20 inline-block align-baseline mx-1"
                  width={1000}
                  height={179}
                />
              )
            })}
          </H2>
          <Paragraph className="text-lg">{t("free_offer.description")}</Paragraph>
          <div className="pt-2">
            <CtaButtonBig
              type={type}
              size="lg"
              value={tcommon.rich("cta.main", {
                fast: () => <Zap size={32} fill="currentColor" />,
                large: (chunks) => <span className="hidden">{chunks}</span>
              })}
            />
            <div className="flex items-center justify-center lg:justify-start gap-2 mt-4">
              <span className="text-sm text-[#5C5B61]">{t("free_offer.bottom")}</span>
            </div>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <BouncingImages tkey={`${tkey}.free_offer`} />
        </div>
      </div>
    </Section>
  );
};
