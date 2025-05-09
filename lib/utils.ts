import { clsx, type ClassValue } from "clsx";
import { Metadata } from "next";
import { PageMetadata } from "@/lib/mdx";
import { twMerge } from "tailwind-merge";
import { THUMBNAIL, WEB_URL } from "@/app/constants";
import { getTranslations } from "next-intl/server";
import {
  AlternateLinkDescriptor,
  Languages,
} from "next/dist/lib/metadata/types/alternative-urls-types";
import { pathnames } from "@/i18n/config";
import { OpenGraphType } from "next/dist/lib/metadata/types/opengraph-types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getCanonicalLink = (locale: string, pathname: string) => {
  console.log(pathname);
  if (pathname === "/") {
    return locale === "en" ? "/" : `/${locale}`;
  }

  const langPath = pathnames[pathname];
  return locale === "en" ? langPath[locale] : `/${locale}${langPath[locale]}`;
};

const getFullLink = (path: string) => {
  return `${WEB_URL}${path}`.replace(/\/$/, "");
};

export async function generateLandingMetadata({
  params,
  pathname,
  lkey,
}: MetadataProps & { lkey: string; pathname: string }) {
  const locale = (await params).locale;
  const t = await getTranslations({ locale, namespace: "metadata" });

  const langPath = pathnames[pathname];

  const canonical = getCanonicalLink(locale, pathname);

  return constructMetadata({
    title: t(`${lkey}.title`),
    description: t(`${lkey}.description`),
    image: t(`${lkey}.image`),
    alternates: {
      canonical: getFullLink(canonical),
      languages: {
        en: getFullLink(langPath["en"]),
        fr: getFullLink(`/fr${langPath["fr"]}`),
      },
    },
  });
}

export async function generatePagesMetadata({
  params,
  dir,
  slug,
  metadata,
}: MetadataProps & {
  dir: string;
  slug: string;
  metadata: PageMetadata;
}) {
  const locale = (await params).locale;

  const pathname = `/${dir}/${slug}`;
  const langPath = pathnames[pathname];
  const canonical = getCanonicalLink(locale, pathname);

  const {
    updatedAt,
    publishedAt,
    image: metadataImage,
    title,
    summary,
  } = metadata;
  const image = metadataImage
    ? metadataImage
    : `${WEB_URL}/api/og?title=${encodeURIComponent(
        title
      )}&description=${encodeURIComponent(summary)}`;

  return constructMetadata({
    title,
    description: summary,
    image,
    alternates: {
      canonical: getFullLink(canonical),
      languages: {
        en: getFullLink(langPath["en"]),
        fr: getFullLink(`/fr${langPath["fr"]}`),
      },
    },
    publishedTime: publishedAt,
    modifiedTime: updatedAt,
    type: "article",
  });
}

export function constructMetadata({
  title,
  description,
  image = THUMBNAIL,
  icons = {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  noIndex = false,
  alternates,
  publishedTime,
  modifiedTime,
  type,
}: {
  title: string;
  description: string;
  image?: string;
  icons?:
    | string
    | {
        icon: string;
        apple: string;
      };
  noIndex?: boolean;
  alternates: {
    canonical: string;
    languages?:
      | Languages<string | URL | AlternateLinkDescriptor[] | null>
      | undefined;
  };
  publishedTime?: string;
  modifiedTime?: string;
  type?: OpenGraphType;
}): Metadata {
  return {
    title,
    description,
    openGraph: {
      type: type || "article",
      title,
      description,
      images: [
        {
          url: image,
        },
      ],
      ...(publishedTime && {
        publishedTime,
      }),
      ...(modifiedTime && {
        modifiedTime,
      }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      // creator: "@",
    },
    icons,
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
    alternates,
  };
}
