import assert from "node:assert/strict";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";
import ts from "typescript";

const sourcePath = path.resolve("src/lib/routes.ts");
const source = await readFile(sourcePath, "utf8");
const compiled = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.ES2022,
    target: ts.ScriptTarget.ES2022,
  },
}).outputText;

const outDir = path.join(tmpdir(), "166-routes-tests");
await mkdir(outDir, { recursive: true });
const compiledPath = path.join(outDir, `routes-${Date.now()}.mjs`);
await writeFile(compiledPath, compiled);

const routes = await import(`file:///${compiledPath.replaceAll("\\", "/")}`);

test("localized service detail URLs keep language prefixes", () => {
  assert.equal(routes.getServiceHref("ev-temizliyi-xidmeti", "ru"), "/ru/uborka-doma/");
  assert.equal(routes.getServiceHref("ev-temizliyi-xidmeti", "tr"), "/tr/ev-temizliyi-xidmeti/");
  assert.deepEqual(routes.resolveLocalizedSlug("ru", "uborka-doma"), {
    kind: "service",
    canonicalSlug: "ev-temizliyi-xidmeti",
  });
});

test("localized blog detail URLs use the post slug under the language prefix", () => {
  assert.equal(routes.getBlogPostHref("chistka-bassejna", "ru"), "/ru/chistka-bassejna/");
  assert.equal(routes.getBlogPostHref("otel-temizliyi", "tr"), "/tr/otel-temizliyi/");
});

test("localized vacancy detail URLs stay under localized vacancy listing path", () => {
  assert.equal(
    routes.getVacancyHref("166-t-mizlik-xidm-tind-menecer-v-zif-sin-muraci-t-etm-y-d-v-t-edir", "ru"),
    "/ru/vakansiya/166-t-mizlik-xidm-tind-menecer-v-zif-sin-muraci-t-etm-y-d-v-t-edir/",
  );
  assert.equal(
    routes.getVacancyHref("166-t-mizlik-xidm-ti-t-mizlikci-v-zif-sin-muraci-t-etm-y-d-v-t-edir", "tr"),
    "/tr/vakansiya/166-t-mizlik-xidm-ti-t-mizlikci-v-zif-sin-muraci-t-etm-y-d-v-t-edir/",
  );
});
