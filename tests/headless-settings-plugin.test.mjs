import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("settings endpoint falls back to contact page fields for contact data", async () => {
  const source = await readFile("wordpress/166-headless-api/166-headless-api.php", "utf8");

  assert.match(source, /contact_page_fields/);
  assert.match(source, /'phonePrimary'\s*=>\s*self::option_text\('phone_primary'\)\s*\?:\s*\$contact\['phonePrimary'\]/);
  assert.match(source, /'email'\s*=>\s*self::option_text\('email'\)\s*\?:\s*\$contact\['email'\]/);
  assert.match(source, /'address'\s*=>\s*self::option_text\('address'\)\s*\?:\s*\$contact\['address'\]/);
  assert.match(source, /'locationUrl'\s*=>\s*self::option_text\('location_url'\)\s*\?:\s*\$contact\['locationUrl'\]/);
});
