import test from "node:test";
import assert from "node:assert/strict";

import { buildWordPressMetadata, normalizeWordPressSchema } from "./wordpress.ts";

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
