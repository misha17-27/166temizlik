import test from "node:test";
import assert from "node:assert/strict";

import * as routes from "./routes.ts";

test("localized aliases redirect to the canonical slug for the requested locale", () => {
  assert.equal(routes.getLocalizedCanonicalRedirectHref?.("ru", "emekdaslarimiz"), "/ru/nashikollegi/");
  assert.equal(routes.getLocalizedCanonicalRedirectHref?.("ru", "temizlik-xidmetleri"), "/ru/uslugi-po-uborke/");
  assert.equal(routes.getLocalizedCanonicalRedirectHref?.("ru", "ev-temizliyi-xidmeti"), "/ru/uborka-doma/");
});

test("canonical localized slugs do not redirect", () => {
  assert.equal(routes.getLocalizedCanonicalRedirectHref?.("ru", "nashikollegi"), null);
  assert.equal(routes.getLocalizedCanonicalRedirectHref?.("ru", "uborka-doma"), null);
  assert.equal(routes.getLocalizedCanonicalRedirectHref?.("tr", "temizlik-xidmetleri"), null);
});
