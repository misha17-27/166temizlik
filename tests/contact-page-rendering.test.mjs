import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("contact page renders mapped contact data instead of duplicating raw WordPress body", async () => {
  const source = await readFile("src/app/166-temizlik-elaqe/page.tsx", "utf8");

  assert.doesNotMatch(source, /WordPressPageContent/);
  assert.match(source, /buildContactPageData/);
  assert.match(source, /contact\.shortText/);
});
