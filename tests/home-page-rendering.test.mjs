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
