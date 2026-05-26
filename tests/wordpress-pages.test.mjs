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

  const tempDir = await mkdtemp(path.join(tmpdir(), "wordpress-pages-"));
  const tempFile = path.join(tempDir, "module.mjs");
  const wordpressStub = path.join(tempDir, "wordpress.mjs");
  output = output.replaceAll('from "./wordpress"', 'from "./wordpress.mjs"');
  await writeFile(
    wordpressStub,
    "export async function getWordPressPage() { return null; }\nexport function stripHtml(value) { return value.replace(/<[^>]*>/g, ' ').replace(/\\s+/g, ' ').trim(); }\nexport function buildWordPressMetadata(seo, fallback = {}) { const metadata = { title: seo?.title ?? fallback.title, description: seo?.description ?? fallback.description }; if (seo?.canonical) metadata.alternates = { canonical: seo.canonical }; if (seo?.openGraph) metadata.openGraph = { title: seo.openGraph.title, description: seo.openGraph.description, images: seo.openGraph.image ? [seo.openGraph.image] : undefined }; if (seo?.twitter) metadata.twitter = { title: seo.twitter.title, description: seo.twitter.description, images: seo.twitter.image ? [seo.twitter.image] : undefined }; return metadata; }\n",
    "utf8",
  );
  await writeFile(tempFile, output, "utf8");

  try {
    return await import(`${pathToFileURL(tempFile).href}?${Date.now()}`);
  } finally {
    await rm(tempDir, { recursive: true, force: true });
  }
}

test("static WordPress route keys resolve to canonical API slugs", async () => {
  const { getWordPressPageSlug } = await importTypeScriptModule("src/lib/wordpress-pages.ts");

  assert.equal(getWordPressPageSlug("about"), "sirket-haqqinda");
  assert.equal(getWordPressPageSlug("equipment"), "temizlik-xidmeti");
  assert.equal(getWordPressPageSlug("partners"), "partnyorlar");
  assert.equal(getWordPressPageSlug("contact"), "166-temizlik-elaqe");
  assert.equal(getWordPressPageSlug("blog"), "bloq");
});

test("WordPress page metadata prefers SEO fields and includes social image", async () => {
  const { buildWordPressPageMetadata } = await importTypeScriptModule("src/lib/wordpress-pages.ts");

  const metadata = buildWordPressPageMetadata(
    {
      title: "Visible title",
      seo: {
        title: "SEO title",
        description: "SEO description",
        canonical: "https://166temizlik.az/sirket-haqqinda/",
      },
      featuredImage: {
        url: "https://admin.166temizlik.az/wp-content/uploads/about.webp",
        alt: "About",
      },
    },
    "Fallback title",
  );

  assert.equal(metadata.title, "SEO title");
  assert.equal(metadata.description, "SEO description");
  assert.equal(metadata.alternates.canonical, "https://166temizlik.az/sirket-haqqinda/");
  assert.deepEqual(metadata.openGraph.images, [
    {
      url: "https://admin.166temizlik.az/wp-content/uploads/about.webp",
      alt: "About",
    },
  ]);
});

test("WordPress equipment page content is parsed into hero, equipment, and material cards", async () => {
  const { getWordPressEquipmentPageContent } = await importTypeScriptModule("src/lib/wordpress-pages.ts");

  const content = getWordPressEquipmentPageContent({
    title: "WP equipment title",
    content: `
      <h2>Avadanlıqlar</h2>
      <h2>Tozsoran</h2>
      <p>First equipment paragraph.</p>
      <p><img src="https://166temizlik.az/wp-content/uploads/2023/09/tozsoran.webp" alt="" /></p>
      <h2>Buxar aparati</h2>
      <p>Second equipment paragraph.</p>
      <p><img src="https://166temizlik.az/wp-content/uploads/2023/09/buxar.webp" alt="" /></p>
      <h2>Maddələr</h2>
      <p><strong>H-04 Genel Fresh Multi Clean</strong> - Antibakterial məhsul.</p>
      <p><strong>H-19 Asit Miracle Plus</strong> - Sanitar qovşaqlar üçün vasitə.</p>
    `,
    featuredImage: {
      url: "https://admin.166temizlik.az/wp-content/uploads/2023/09/hero.webp",
      alt: "Hero image",
    },
  });

  assert.equal(content.title, "WP equipment title");
  assert.equal(content.heroImage, "https://admin.166temizlik.az/wp-content/uploads/2023/09/hero.webp");
  assert.equal(content.equipmentTitle, "Avadanlıqlar");
  assert.equal(content.materialsTitle, "Maddələr");
  assert.deepEqual(content.equipmentCards, [
    {
      title: "Tozsoran",
      text: "First equipment paragraph.",
      image: "https://166temizlik.az/wp-content/uploads/2023/09/tozsoran.webp",
    },
    {
      title: "Buxar aparati",
      text: "Second equipment paragraph.",
      image: "https://166temizlik.az/wp-content/uploads/2023/09/buxar.webp",
    },
  ]);
  assert.deepEqual(content.materialCards, [
    {
      title: "H-04 Genel Fresh Multi Clean",
      text: "Antibakterial məhsul.",
    },
    {
      title: "H-19 Asit Miracle Plus",
      text: "Sanitar qovşaqlar üçün vasitə.",
    },
  ]);
});
