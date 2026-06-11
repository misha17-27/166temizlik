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
  assert.match(plugin, /array_slice\(\$slides, 0, 8\)/);
  assert.match(plugin, /localized_slide_image\(\$post->ID, \$lang, 'desktop'\)/);
  assert.match(plugin, /localized_slide_image\(\$source_id, \$lang, 'desktop'\)/);
  assert.match(plugin, /localized_slide_image\(\$post->ID, \$lang, 'mobile'\)/);
  assert.match(plugin, /localized_slide_image\(\$source_id, \$lang, 'mobile'\)/);
  assert.match(plugin, /slide_background_color\(\$post->ID\)/);
  assert.match(plugin, /slide_background_color\(\$source_id\)/);
  assert.match(plugin, /'desktopBgColor' => \$background_color/);
  assert.match(plugin, /private static function source_post_id\(WP_Post \$post\): int/);
  assert.match(plugin, /get_post_meta\(\$source_id, 'sort_order', true\)/);
});

test("home endpoint maps hourly prices for localized home pages", () => {
  assert.match(plugin, /'hourlyPrices' => self::home_hourly_prices\(\$fields\)/);
  assert.match(plugin, /private static function home_hourly_prices\(array \$fields\): array/);
  assert.match(plugin, /'hourlyHelper' => self::acf_text\(self::acf_first\(\$fields,/);
});

test("admin permalinks point to the configured frontend site", () => {
  assert.match(plugin, /add_filter\('page_link', \[self::class, 'frontend_page_link'\]/);
  assert.match(plugin, /add_filter\('preview_post_link', \[self::class, 'frontend_preview_post_link'\]/);
  assert.match(plugin, /add_filter\('get_sample_permalink_html', \[self::class, 'frontend_sample_permalink_html'\]/);
  assert.match(plugin, /private static function frontend_site_url\(\): string/);
  assert.match(plugin, /ONE66_FRONTEND_SITE_URL/);
  assert.match(plugin, /frontend_site_url/);
  assert.match(plugin, /https:\/\/166temizlik\.vercel\.app/);
  assert.match(plugin, /private static function frontend_permalink_path\(WP_Post \$post\): string/);
});

test("saving a Pods slide revalidates localized home pages", () => {
  assert.match(plugin, /'slayd'/);
  assert.match(plugin, /\$post->post_type === 'slayd'/);
  assert.match(plugin, /return \['\/', '\/ru', '\/tr'\]/);
});
