import { ReactNode } from "react";
import { Zap } from "lucide-react";
import { H2 as BaseH2 } from "@/components/base/h2";

// Typography components
export const H1 = ({ children }: { children: ReactNode }) => <>{children}</>;
export const H2 = ({ children, align = "center" }: { children: ReactNode; align?: "center" | "left" }) => (
  <BaseH2 className={align === "left" ? "text-left" : ""}>{children}</BaseH2>
);
export const H3 = ({ children }: { children: ReactNode }) => (
  <h3 className="text-2xl font-bold text-[#08272E]">{children}</h3>
);
export const H4 = ({ children }: { children: ReactNode }) => (
  <h4 className="font-semibold text-lg text-[#08272E] mb-3">{children}</h4>
);
export const Summary = ({ children }: { children: ReactNode }) => <>{children}</>;
export const Text = ({ children, size = "base" }: { children: ReactNode; size?: "base" | "lg" }) => {
  const sizeClasses = {
    base: "",
    lg: "text-lg"
  };

  // Default color is muted (gray-600), lg size gets mb-8
  const spacing = size === "lg" ? "mb-8" : "";

  return <div className={`${sizeClasses[size]} text-gray-600 ${spacing} leading-relaxed`}>{children}</div>;
};
export const SmallText = ({ children }: { children: ReactNode }) => <>{children}</>;
export const Label = ({
  children,
  variant = "default"
}: {
  children: ReactNode;
  variant?: "default" | "problem" | "solution" | "none";
}) => {
  const icons = {
    default: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    problem: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    solution: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    none: () => null
  };

  return (
    <div className="inline-flex items-center justify-center mb-6">
      <div className="bg-gray-100 text-gray-900 py-2 px-4 rounded-full flex items-center justify-center gap-2 uppercase text-sm font-bold">
        {variant !== "none" && icons[variant]}
        {children}
      </div>
    </div>
  );
};

// List components
export const List = ({
  children,
  layout = "vertical"
}: {
  children: ReactNode;
  layout?: "vertical" | "horizontal";
}) => {
  const layoutClasses = layout === "horizontal" ? "grid gap-4 md:grid-cols-2 lg:grid-cols-3" : "space-y-4";

  return <div className={layoutClasses}>{children}</div>;
};

export const Item = ({
  children,
  variant = "default"
}: {
  children: ReactNode;
  variant?: "default" | "problem" | "solution";
}) => {
  if (variant === "problem") {
    const X = () => (
      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    );

    return (
      <div className="rounded-xl flex items-start gap-4 p-4 bg-gray-50 border border-gray-200">
        <div className="rounded-full flex-shrink-0 w-8 h-8 bg-gray-100 flex items-center justify-center mt-0.5">
          <X />
        </div>
        <p className="text-gray-900 font-medium flex-1 leading-relaxed">{children}</p>
      </div>
    );
  }

  if (variant === "solution") {
    const Check = () => (
      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    );

    return (
      <div className="rounded-xl flex items-start gap-4 p-4 bg-green-50 border border-green-200">
        <div className="rounded-full flex-shrink-0 w-8 h-8 bg-green-100 flex items-center justify-center mt-0.5">
          <Check />
        </div>
        <p className="text-gray-900 font-medium flex-1 leading-relaxed">{children}</p>
      </div>
    );
  }

  return <>{children}</>;
};

// Feature components
export const Feature = ({ children }: { children: ReactNode }) => <>{children}</>;
export const FeatureTitle = ({ children }: { children: ReactNode }) => <>{children}</>;
export const FeatureText = ({ children }: { children: ReactNode }) => <>{children}</>;

export const FeatureCard = ({ children }: { children: ReactNode }) => <div className="text-center">{children}</div>;

export const IconBox = ({ icon }: { icon: "zap" | "globe" | "share" }) => {
  const icons = {
    zap: <Zap size={28} className="text-[#3970ff]" />,
    globe: (
      <svg className="w-7 h-7 text-[#3970ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z M3 12h18 M12 3c1.66 0 3 4.03 3 9s-1.34 9-3 9-3-4.03-3-9 1.34-9 3-9z"
        />
      </svg>
    ),
    share: (
      <svg className="w-7 h-7 text-[#3970ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8.59 13.51l6.83 3.98m-.01-10.98l-6.82 3.98M21 5a3 3 0 11-6 0 3 3 0 016 0zM3 12a3 3 0 116 0 3 3 0 01-6 0zm18 7a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    )
  };

  return (
    <div className="inline-flex items-center justify-center w-16 h-16 bg-[#3970ff]/10 rounded-2xl mb-6">
      {icons[icon]}
    </div>
  );
};

// Group components
export const Group = ({ children }: { children: ReactNode }) => <>{children}</>;
export const Features = ({ children }: { children: ReactNode }) => <>{children}</>;

// CTA components
export const CTA = ({ children }: { children: ReactNode }) => <>{children}</>;
export const Fast = () => <Zap size={32} fill="currentColor" />;
export const CtaBottomText = ({ children }: { children: ReactNode }) => (
  <div className="flex items-center justify-center lg:justify-start gap-2 mt-4">
    <span className="text-sm text-[#5C5B61]">{children}</span>
  </div>
);

// Layout components
export const Centered = ({ children }: { children: ReactNode }) => (
  <div className="flex flex-col items-center text-center space-y-4 mb-12 max-w-4xl mx-auto px-4 w-full">{children}</div>
);

export const ContentWrapper = ({ children }: { children: ReactNode }) => (
  <div className="space-y-6 text-center lg:text-left">{children}</div>
);

export const Section = ({
  children,
  variant = "plain",
  maxWidth = "6xl",
  id
}: {
  children: ReactNode;
  variant?: "card" | "plain";
  maxWidth?: "full" | "6xl" | "4xl" | "2xl";
  id?: string;
}) => {
  const baseClasses =
    variant === "card" ? "bg-white rounded-3xl border border-gray-200 p-8 lg:p-12 mb-12" : "py-4 mb-12";

  const widthClasses = {
    full: "",
    "6xl": "max-w-6xl mx-auto",
    "4xl": "max-w-4xl mx-auto",
    "2xl": "max-w-2xl mx-auto"
  };

  return (
    <div id={id} className={`${baseClasses} ${widthClasses[maxWidth]}`}>
      {children}
    </div>
  );
};

export const TwoColumns = ({
  children,
  ratio = "1-1"
}: {
  children: ReactNode;
  ratio?: "1-1" | "1-2" | "2-1" | "5-7" | "7-5";
}) => {
  const ratioClasses = {
    "1-1": "lg:grid-cols-2", // 1:1 ratio
    "1-2": "lg:grid-cols-3", // 1:2 ratio
    "2-1": "lg:grid-cols-3", // 2:1 ratio
    "5-7": "lg:grid-cols-12", // 5:7 ratio
    "7-5": "lg:grid-cols-12" // 7:5 ratio
  };

  return <div className={`grid grid-cols-1 ${ratioClasses[ratio]} gap-8 lg:gap-12 items-center`}>{children}</div>;
};

export const Column = ({
  children,
  span = 1,
  order = "default"
}: {
  children: ReactNode;
  span?: 1 | 2 | 3 | 5 | 7;
  order?: "default" | "text" | "visual";
}) => {
  const spanClasses = {
    1: "lg:col-span-1",
    2: "lg:col-span-2",
    3: "lg:col-span-3",
    5: "lg:col-span-5",
    7: "lg:col-span-7"
  };

  // On mobile, text columns come first (order-1), visual columns come second (order-2)
  // On desktop, reset to default order (lg:order-none)
  const orderClasses = {
    default: "",
    text: "order-1 lg:order-none",
    visual: "order-2 lg:order-none"
  };

  return <div className={`${spanClasses[span]} ${orderClasses[order]} space-y-4`}>{children}</div>;
};

// Problem components
export const WithoutPimms = () => (
  <div className="inline-flex items-center gap-2 text-gray-600 font-semibold text-sm uppercase tracking-wider mb-4">
    <div className="w-8 h-[2px] bg-gray-600"></div>
    Without PIMMS
    <div className="w-8 h-[2px] bg-gray-600"></div>
  </div>
);

// Media components
export const Video = ({ src }: { src: string }) => (
  <video autoPlay loop muted playsInline className="w-full h-auto object-cover border border-gray-200 rounded-2xl">
    <source src={src} type="video/mp4" />
  </video>
);

// Styling components
export const Primary = ({ children }: { children: React.ReactNode }) => (
  <span className="text-[#3970ff]">{children}</span>
);

export const HideOnMobile = ({ children }: { children: React.ReactNode }) => (
  <span className="hidden sm:inline">{children}</span>
);
