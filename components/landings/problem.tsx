import { H2 } from "../base/h2";
import { Paragraph } from "../base/paragraph";
import { useTranslations } from "next-intl";
import { X, AlertCircle } from "lucide-react";
import { Label } from "../base/label";
import { Section } from "../base/section";

export const Problem = ({ tkey, showSecondSection = false }: { tkey: string; showSecondSection?: boolean }) => {
  const t = useTranslations(tkey);

  return (
    <Section id="problem">
      {/* Header Section */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center mb-6">
          <Label className="bg-gray-100 text-gray-900 py-2 px-4 flex items-center justify-center gap-2 uppercase text-sm font-bold">
            <AlertCircle className="w-5 h-5" />
            {t("problem.title")}
          </Label>
        </div>
        <H2>
          {t.rich("problem.heading", {
            strong: (chunks) => <span className="text-blue-600">{chunks}</span>
          })}
        </H2>
      </div>
      {/* Main Problem Section */}
      <div className="bg-white rounded-3xl border border-gray-200">
        <div className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
            {/* Content Section */}
            <div className="lg:col-span-3 space-y-6">
              <div className="inline-flex items-center gap-2 text-gray-600 font-semibold text-sm uppercase tracking-wider mb-4">
                <div className="w-8 h-[2px] bg-gray-600"></div>
                {t("problem.without_pimms")}
                <div className="w-8 h-[2px] bg-gray-600"></div>
              </div>
              <Paragraph className="text-lg text-gray-600 leading-relaxed">{t("problem.description")}</Paragraph>
              <div className="space-y-4">
                <ProblemItem
                  title={t.rich("problem.more.title1", {
                    strong: (chunks) => <strong className="text-gray-900">{chunks}</strong>
                  })}
                  icon={<X className="w-5 h-5 text-gray-600" />}
                  variant="alert"
                />
                <ProblemItem
                  title={t.rich("problem.more.title2", {
                    strong: (chunks) => <strong className="text-gray-900">{chunks}</strong>
                  })}
                  icon={<X className="w-5 h-5 text-gray-600" />}
                  variant="alert"
                />
                <ProblemItem
                  title={t.rich("problem.more.title3", {
                    strong: (chunks) => <strong className="text-gray-900">{chunks}</strong>
                  })}
                  icon={<X className="w-5 h-5 text-gray-600" />}
                  variant="alert"
                />
              </div>
            </div>
            {/* Video Section */}
            <div className="lg:col-span-2">
              <video autoPlay loop muted playsInline className="w-full h-auto object-cover border border-gray-200">
                <source src="https://assets.pimms.io/too-many-step-paypal.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </div>
      {/* Second Section */}
      {showSecondSection && (
        <div className="mt-12">
          <div className="bg-white border border-gray-200 p-8 rounded-3xl">
            <div className="max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 text-gray-600 font-semibold text-sm uppercase tracking-wider mb-6">
                <div className="w-8 h-[2px] bg-gray-600"></div>
                {t("problem.without_pimms")}
                <div className="w-8 h-[2px] bg-gray-600"></div>
              </div>
              <Paragraph className="text-lg text-gray-600 leading-relaxed mb-8">{t("problem.description2")}</Paragraph>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <ProblemItem
                  title={t.rich("problem.more2.title1", {
                    strong: (chunks) => <strong className="text-gray-900">{chunks}</strong>
                  })}
                  icon={<X className="w-5 h-5 text-gray-600" />}
                  variant="alert"
                  compact
                />
                <ProblemItem
                  title={t.rich("problem.more2.title2", {
                    strong: (chunks) => <strong className="text-gray-900">{chunks}</strong>
                  })}
                  icon={<X className="w-5 h-5 text-gray-600" />}
                  variant="alert"
                  compact
                />
                <ProblemItem
                  title={t.rich("problem.more2.title3", {
                    strong: (chunks) => <strong className="text-gray-900">{chunks}</strong>
                  })}
                  icon={<X className="w-5 h-5 text-gray-600" />}
                  variant="alert"
                  compact
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </Section>
  );
};

const ProblemItem = ({
  title,
  icon,
  compact = false
}: {
  title: string | React.ReactNode;
  icon?: React.ReactNode;
  compact?: boolean;
  variant?: "default" | "alert";
}) => {
  return (
    <div
      className={`rounded-xl flex items-start gap-4 p-4 bg-gray-50 border border-gray-200 ${compact ? "md:col-span-1" : ""}`}
    >
      <div className="rounded-full flex-shrink-0 w-8 h-8 bg-gray-100 flex items-center justify-center mt-0.5">
        {icon}
      </div>
      <Paragraph className={`text-gray-900 font-medium flex-1 leading-relaxed ${compact ? "text-sm" : ""}`}>
        {title}
      </Paragraph>
    </div>
  );
};
