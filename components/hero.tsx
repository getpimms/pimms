"use client";
import Image from "next/image";
import TextTransition from "@/components/TextTransition";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import WorkWith from "./WorkWith";
import { Timer } from "lucide-react";

export const Hero = ({ tkey }: { tkey: string }) => {
  const t = useTranslations(tkey);
  const TEXTS = [
    "Linkedin",
    "Instagram",
    "Facebook",
    "TikTok",
    t("hero.social_media"),
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(
      () => setIndex((index) => index + 1),
      1700 // every 3 seconds
    );
    return () => clearTimeout(intervalId);
  }, []);

  const gotoPro = () => {
    const proSection = document.getElementById("lifetime");
    if (proSection) {
      proSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      className="w-full my-6 md:my-12 text-center px-1 md:px-6"
      id="waitlist"
    >
      <div
        className="cursor-pointer flex items-center gap-2 text-xs md:text-sm font-semibold p-2 bg-[#B3E4FF] text-[#08272E] rounded-xl z-10 mb-8 md:mb-16 w-fit mx-auto"
        onClick={gotoPro}
      >
        <Timer className="w-4 h-4 min-w-4" />
        {t("lifetime_offer.promo_code")}
      </div>
      <div className="max-w-sm md:max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold tracking-tight text-balance text-[#08272E]">
          {t.rich("hero.title", {
            swap: () => (
              <TextTransition
                className="text-primary"
                allTexts={TEXTS}
                activeIndex={index % TEXTS.length}
                verticalAlign="baseline"
                direction="down"
              />
            ),
            youtube: () => (
              <Image
                src="/static/youtube.svg"
                alt="YouTube"
                className="w-32 md:w-40 inline-block mx-2 mb-2"
                width={800}
                height={178}
              />
            ),
            linkedin: () => (
              <Image
                src="/static/linkedin.svg"
                alt="Linkedin"
                className="w-32 md:w-40 lg:w-56 inline-block mx-2 mb-2"
                width={800}
                height={195}
              />
            ),
          })}
        </h1>
        <p className="text-lg md:text-xl mt-3 max-w-3xl mx-auto leading-relaxed text-balance text-slate-600">
          {t.rich("hero.description", {
            strong: (chunks) => <strong>{chunks}</strong>,
          })}
        </p>
      </div>
      <WorkWith tkey={tkey} />
    </section>
  );
};
