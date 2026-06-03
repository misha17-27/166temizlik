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

test("settings endpoint merges contact page ACF fields", () => {
  assert.match(plugin, /\$contact = array_merge\(self::contact_page_fields\(\$lang\)/);
  assert.match(plugin, /self::contact_page_fields\(\$lang\)/);
  assert.match(plugin, /'contact' => \$contact/);
});

test("settings endpoint falls back to WordPress site icon for favicon", () => {
  assert.match(plugin, /\$favicon = self::option_image\('favicon'\) \?: self::site_icon\(\)/);
  assert.match(plugin, /'favicon' => \$favicon/);
  assert.match(plugin, /'favicon' => \$favicon,\s+\]/);
  assert.match(plugin, /private static function site_icon\(\): \?array/);
  assert.match(plugin, /get_site_icon_url\(/);
});

test("static page AZ fallback restores requested WPML language", () => {
  assert.match(plugin, /self::switch_language\(\$lang\);\s+return \$source;/);
});

test("home endpoint maps published Pods slides with WPML fallback", () => {
  assert.match(plugin, /\$pods_slides = self::home_slides\(\$lang\)/);
  assert.match(plugin, /'post_type' => 'slayd'/);
  assert.match(plugin, /get_post_meta\(\$post->ID, 'mobile_slide', true\)/);
  assert.match(plugin, /get_post_meta\(\$post->ID, 'sort_order', true\)/);
  assert.match(plugin, /count\(\$slides\) < 2 && \$lang !== 'az'/);
  assert.match(plugin, /array_slice\(\$slides, 0, 4\)/);
});

test("saving a Pods slide revalidates localized home pages", () => {
  assert.match(plugin, /'slayd'/);
  assert.match(plugin, /\$post->post_type === 'slayd'/);
  assert.match(plugin, /return \['\/', '\/ru', '\/tr'\]/);
});
