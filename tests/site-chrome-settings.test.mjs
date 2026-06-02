import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("site chrome reads WordPress settings with static fallbacks", async () => {
  const source = await readFile("src/components/SiteChrome.tsx", "utf8");

  assert.match(source, /wp-json\/headless\/v1\/settings\?lang=\$\{locale\}/);
  assert.match(source, /const headerLogo = settings\?\.logo \|\| site\.logo/);
  assert.match(source, /const footerLogo = settings\?\.logoDark \|\| settings\?\.logo \|\| site\.footerLogo/);
  assert.match(source, /const ctaTitle = settings\?\.footer\?\.ctaTitle \|\| copy\.cta\.title/);
  assert.match(source, /const popupTitle = settings\?\.orderPopup\?\.title/);
});
