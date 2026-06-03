import test from "node:test";
import assert from "node:assert/strict";

import { buildWordPressMetadata, getWordPressTranslationSlugs, normalizeWordPressSchema } from "./wordpress.ts";

test("buildWordPressMetadata maps Yoast SEO fields to Next metadata", () => {
  const metadata = buildWordPressMetadata(
    {
      title: "Yoast title",
      description: "Yoast description",
      canonical: "https://166temizlik.az/bloq/",
      openGraph: {
        title: "OG title",
        description: "OG description",
        image: "https://166temizlik.az/og.jpg",
      },
      twitter: {
        title: "Twitter title",
        description: "Twitter description",
        image: "https://166temizlik.az/twitter.jpg",
      },
      robots: {
        index: false,
        follow: false,
        advanced: ["noarchive", "max-snippet:-1"],
      },
    },
    { title: "Fallback title", description: "Fallback description" },
  );

  assert.deepEqual(metadata, {
    title: "Yoast title",
    description: "Yoast description",
    alternates: {
      canonical: "https://166temizlik.az/bloq/",
    },
    openGraph: {
      title: "OG title",
      description: "OG description",
      images: ["https://166temizlik.az/og.jpg"],
    },
    twitter: {
      title: "Twitter title",
      description: "Twitter description",
      images: ["https://166temizlik.az/twitter.jpg"],
    },
    robots: {
      index: false,
      follow: false,
      noarchive: true,
      "max-snippet": -1,
    },
  });
});

test("buildWordPressMetadata uses fallbacks and skips empty optional SEO groups", () => {
  const metadata = buildWordPressMetadata(
    {
      title: "",
      description: null,
      canonical: undefined,
      openGraph: {
        title: "",
        description: undefined,
        image: null,
      },
      twitter: null,
    },
    { title: "Fallback title", description: "Fallback description" },
  );

  assert.deepEqual(metadata, {
    title: "Fallback title",
    description: "Fallback description",
  });
});

test("normalizeWordPressSchema prepares JSON-LD payloads", () => {
  assert.deepEqual(
    normalizeWordPressSchema([
      "",
      null,
      { "@type": "WebPage", name: "Gallery" },
      "{\"@type\":\"BreadcrumbList\"}",
    ]),
    [
      "{\"@type\":\"WebPage\",\"name\":\"Gallery\"}",
      "{\"@type\":\"BreadcrumbList\"}",
    ],
  );
});

test("WordPress admin URLs are rewritten to the public site URL", () => {
  const metadata = buildWordPressMetadata({
    canonical: "https://admin.166temizlik.az/sirket-haqqinda/",
    openGraph: {
      image: "https://admin.166temizlik.az/wp-content/uploads/social.jpg",
    },
    twitter: {
      image: "https://admin.166temizlik.az/wp-content/uploads/twitter.jpg",
    },
  });

  assert.deepEqual(metadata, {
    alternates: {
      canonical: "https://166temizlik.az/sirket-haqqinda/",
    },
    openGraph: {
      images: ["https://166temizlik.az/wp-content/uploads/social.jpg"],
    },
    twitter: {
      images: ["https://166temizlik.az/wp-content/uploads/twitter.jpg"],
    },
  });

  assert.deepEqual(
    normalizeWordPressSchema({
      "@type": "WebPage",
      url: "https://admin.166temizlik.az/sirket-haqqinda/",
    }),
    ['{"@type":"WebPage","url":"https://166temizlik.az/sirket-haqqinda/"}'],
  );
});

test("getWordPressTranslationSlugs maps WPML translations by locale", () => {
  assert.deepEqual(
    getWordPressTranslationSlugs({
      slug: "otelde-temizliyik-isleri",
      language: "az",
      translations: {
        az: { id: 1, slug: "otelde-temizliyik-isleri", link: "" },
        ru: { id: 2, slug: "uborka-otelya", link: "" },
        tr: { id: 3, slug: "otel-temizliyi", link: "" },
      },
    }),
    {
      az: "otelde-temizliyik-isleri",
      ru: "uborka-otelya",
      tr: "otel-temizliyi",
    },
  );
});
