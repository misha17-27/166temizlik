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

  assert.match(
    componentSource,
    /src=\{item\.desktopImage\}[\s\S]*?fill[\s\S]*?sizes="\(max-width: 768px\) 1px, 100vw"[\s\S]*?className="hidden object-contain md:block"/,
  );
});
