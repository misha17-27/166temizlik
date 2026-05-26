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
  output = output.replaceAll('from "./wordpress"', 'from "./wordpress.mjs"');
  await writeFile(wordpressStub, "export async function getWordPressHome() { return null; }\n", "utf8");
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
