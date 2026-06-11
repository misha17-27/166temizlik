import assert from "node:assert/strict";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";
import test from "node:test";
import ts from "typescript";

async function importTypeScriptModule(sourcePath) {
  const absoluteSource = path.resolve(sourcePath);
  const source = await readFile(absoluteSource, "utf8");
  let output = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.ES2022,
      target: ts.ScriptTarget.ES2022,
      moduleResolution: ts.ModuleResolutionKind.Bundler,
      verbatimModuleSyntax: true,
    },
    fileName: absoluteSource,
  }).outputText;

  const tempDir = await mkdtemp(path.join(tmpdir(), "wordpress-home-"));
  const tempFile = path.join(tempDir, "module.mjs");
  const wordpressStub = path.join(tempDir, "wordpress.mjs");
  const siteDataStub = path.join(tempDir, "site-data.mjs");
  const i18nStub = path.join(tempDir, "i18n.mjs");
  output = output.replaceAll('from "./wordpress"', 'from "./wordpress.mjs"');
  output = output.replaceAll('from "./site-data"', 'from "./site-data.mjs"');
  output = output.replaceAll('from "./i18n"', 'from "./i18n.mjs"');
  await writeFile(
    wordpressStub,
    "export async function getWordPressHome() { return null; }\nexport function normalizeWordPressMediaUrl(value) { return value; }\n",
    "utf8",
  );
  await writeFile(
    siteDataStub,
    "export const weeklyPrices = [{ label: '1 gün / həftə', four: '90₼', eight: '110₼' }, { label: '2 gün / həftə', four: '160₼', eight: '200₼' }, { label: '3 gün / həftə', four: '210₼', eight: '270₼' }];\n",
    "utf8",
  );
  await writeFile(
    i18nStub,
    "export function getLocalizedServices() { return [{ slug: 'ofis-temizliyi', title: 'Fallback', icon: '/icon.svg', href: '/ofis-temizliyi/' }]; }\n",
    "utf8",
  );
  await writeFile(tempFile, output, "utf8");

  try {
    return await import(`${pathToFileURL(tempFile).href}?${Date.now()}`);
  } finally {
    await rm(tempDir, { recursive: true, force: true });
  }
}

test("buildHomePageData preserves service slug", async () => {
  const { buildHomePageData } = await importTypeScriptModule("src/lib/wordpress-home.ts");

  const data = buildHomePageData("az", {
    services: [
      {
        title: "Office cleaning",
        slug: "ofis-temizliyi",
        icon: { url: "https://166temizlik.az/icon.png" },
      },
    ],
  });

  assert.deepEqual(data.services[0], {
    slug: "ofis-temizliyi",
    title: "Office cleaning",
    icon: "https://166temizlik.az/icon.png",
    href: "/ofis-temizliyi/",
  });
});

test("buildHomePageData uses localized hourly prices from WordPress payload", async () => {
  const { buildHomePageData } = await importTypeScriptModule("src/lib/wordpress-home.ts");

  const data = buildHomePageData("ru", {
    hourlyPrices: [
      {
        time: "2 часа",
        city: "Баку - 75 azn",
        village: "Поселки Баку - 95 azn",
      },
      {
        time: "3 часа",
        city: "Баку - 85 azn",
        village: "Поселки Баку - 105 azn",
      },
    ],
    hourlyHelper: "(текст из админки)",
  });

  assert.deepEqual(data.copy.hourlyPrices, [
    {
      time: "2 часа",
      city: "Баку - 75 azn",
      village: "Поселки Баку - 95 azn",
    },
    {
      time: "3 часа",
      city: "Баку - 85 azn",
      village: "Поселки Баку - 105 azn",
    },
  ]);
  assert.equal(data.copy.hourlyHelper, "(текст из админки)");
});

test("buildHomePageData clears fallback hourly helper when WordPress hourly prices include full village text", async () => {
  const { buildHomePageData } = await importTypeScriptModule("src/lib/wordpress-home.ts");

  const data = buildHomePageData("az", {
    hourlyPrices: [
      {
        time: "2 saat",
        city: "Bakı - 70 azn",
        village: "Bakı kəndləri - 90 azn ( 1 nəfər xanım kömək məqsədi ilə gəlir)",
      },
    ],
  });

  assert.equal(data.copy.hourlyHelper, "");
});
