import { useTranslations } from "next-intl";
import Image from "next/image";
import { Section } from "@/components/base/section";

export default function WorkWith({ tkey }: { tkey: string }) {
  const t = useTranslations(tkey);

  if (tkey === "landing.youtube") {
    return null;
  }

  return (
    <Section className="my-8 w-fit">
      <p className="text-md md:text-lg flex flex-col md:flex-row items-center gap-2 md:gap-4">
        {t.rich("hero.works_with", {
          symbols: () => (
            <span className="flex justify-center items-center gap-4 opacity-70">
              <Image
                src="https://cdn.brandfetch.io/idVfYwcuQz/theme/dark/idNobVnGbv.svg?c=1dxbfHSJFAPEGdCLU4o5B"
                alt="YouTube"
                width={24}
                height={24}
                className="max-w-[24px] max-h-[24px]"
              />
              <Image
                src="https://cdn.brandfetch.io/ido5G85nya/theme/dark/symbol.svg?c=1dxbfHSJFAPEGdCLU4o5B"
                alt="Instagram"
                width={24}
                height={24}
                className="max-w-[24px] max-h-[24px]"
              />
              <Image
                src="https://cdn.brandfetch.io/id-0D6OFrq/theme/dark/idc6geU1eB.svg?c=1dxbfHSJFAPEGdCLU4o5B"
                alt="TikTok"
                width={24}
                height={24}
                className="max-w-[24px] max-h-[24px]"
              />
              <Image
                src="https://cdn.brandfetch.io/idawOgYOsG/theme/dark/symbol.svg?c=1dxbfHSJFAPEGdCLU4o5B"
                alt="Amazon"
                width={24}
                height={24}
                className="max-w-[24px] max-h-[24px]"
              />
              {/* <Image
              src="https://cdn.brandfetch.io/id6Zq084G_/theme/dark/idw5tPGo_I.svg?c=1dxbfHSJFAPEGdCLU4o5B"
              alt="WhatsApp"
              width={24}
              height={24}
              className="max-w-[24px] max-h-[24px]"
            /> */}
            </span>
          ),
        })}
      </p>
    </Section>
  );
}
