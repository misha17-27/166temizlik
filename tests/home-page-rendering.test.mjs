import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("home page fetches WordPress home payload and passes mapped data to HomePage", async () => {
  const pageSource = await readFile("src/app/page.tsx", "utf8");
  const componentSource = await readFile("src/components/HomePage.tsx", "utf8");

  assert.match(pageSource, /getHomePageData/);
  assert.match(pageSource, /<HomePage homeData=\{homeData\}/);
  assert.match(componentSource, /homeData\?:/);
});

test("desktop hero slides fit inside the fixed-height slider without overflow", async () => {
  const componentSource = await readFile("src/components/HeroSlider.tsx", "utf8");

  assert.match(componentSource, /getImageProps\(\{[\s\S]*?src: slide\.desktopImage[\s\S]*?sizes: "100vw"/);
  assert.match(componentSource, /<source media="\(min-width: 768px\)" srcSet=\{desktopSrcSet\}/);
  assert.match(componentSource, /className="absolute inset-0 h-full w-full object-contain"/);
});

test("WordPress hero slides alternate blue and yellow fallback backgrounds", async () => {
  const homeSource = await readFile("src/lib/wordpress-home.ts", "utf8");

  assert.match(homeSource, /const heroSlideBackgrounds = \["#0271C9", "#FFF424"\]/);
  assert.match(homeSource, /function slideBackgroundColor/);
  assert.match(homeSource, /desktopBgColor: slideBackgroundColor\(slide, index\)/);
});
