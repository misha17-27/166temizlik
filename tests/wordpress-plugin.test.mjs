import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const plugin = await readFile("wordpress/166-headless-api/166-headless-api.php", "utf8");

test("headless plugin registers static page endpoints", () => {
  assert.match(plugin, /read_route\('\/home', 'home'\)/);
  assert.match(plugin, /read_route\('\/partners', 'partners'\)/);
});

test("gallery endpoint falls back to the WordPress gallery page ACF", () => {
  assert.match(plugin, /static_page_post\('gallery'/);
  assert.match(plugin, /map_gallery_fields/);
});

test("Yoast SEO response exposes schema data", () => {
  assert.match(plugin, /'schema' =>/);
  assert.match(plugin, /yoast_schema/);
});
