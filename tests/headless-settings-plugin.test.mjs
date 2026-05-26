import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("settings endpoint falls back to contact page fields for contact data", async () => {
  const source = await readFile("wordpress/166-headless-api/166-headless-api.php", "utf8");

  assert.match(source, /contact_page_fields/);
  assert.match(source, /\$contact = array_merge\(self::contact_page_fields\(\$lang\), array_filter\(/);
  assert.match(source, /'phonePrimary' => self::option_text\('phone_primary'\)/);
  assert.match(source, /'email' => self::option_text\('email'\)/);
  assert.match(source, /'address' => self::option_text\('address'\)/);
  assert.match(source, /'locationUrl' => self::option_text\('location_url'\)/);
  assert.match(source, /'contact' => \$contact/);
});
