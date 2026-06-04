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

test("language alternates include all locales and x-default", () => {
  assert.deepEqual(routes.getLanguageAlternates("gallery"), {
    az: "/qalereya/",
    ru: "/ru/galereya/",
    tr: "/tr/qalereya/",
    "x-default": "/qalereya/",
  });

  assert.deepEqual(
    routes.getBlogLanguageAlternates({
      az: "vinil-dos-m-ni-nec-t-mizl-m-k-olar",
      ru: "uborka-doma",
      tr: "vinil-dos-m-ni-nec-t-mizl-m-k-olar",
    }),
    {
      az: "/vinil-dos-m-ni-nec-t-mizl-m-k-olar/",
      ru: "/ru/bloq/uborka-doma/",
      tr: "/tr/vinil-dos-m-ni-nec-t-mizl-m-k-olar/",
      "x-default": "/vinil-dos-m-ni-nec-t-mizl-m-k-olar/",
    },
  );
});
