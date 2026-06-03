import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

test("root metadata reads the WordPress favicon with the original site fallback", async () => {
  const source = await readFile("src/app/layout.tsx", "utf8");

  assert.match(source, /getWordPressSettings/);
  assert.match(source, /export async function generateMetadata\(\): Promise<Metadata>/);
  assert.match(source, /settings\?\.favicon \|\| "https:\/\/166temizlik\.az\/wp-content\/uploads\/2022\/12\/fav\.png"/);
  await assert.rejects(() => access("src/app/favicon.ico"));
});
