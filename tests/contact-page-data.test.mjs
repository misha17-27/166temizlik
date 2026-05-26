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
  const output = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.ES2022,
      target: ts.ScriptTarget.ES2022,
      moduleResolution: ts.ModuleResolutionKind.Bundler,
      verbatimModuleSyntax: true,
    },
    fileName: absoluteSource,
  }).outputText;

  const tempDir = await mkdtemp(path.join(tmpdir(), "contact-page-data-"));
  const tempFile = path.join(tempDir, "module.mjs");
  await writeFile(tempFile, output, "utf8");

  try {
    return await import(`${pathToFileURL(tempFile).href}?${Date.now()}`);
  } finally {
    await rm(tempDir, { recursive: true, force: true });
  }
}

test("buildContactPageData uses WordPress page ACF and content for contact fields", async () => {
  const { buildContactPageData } = await importTypeScriptModule("src/lib/contact-page-data.ts");

  const data = buildContactPageData(
    {
      title: "Əlaqə",
      excerpt: "Müraciət et, biz əlaqə saxlayaq! Bizimlə əlaqə",
      content: `
        <h2>Müraciət et, biz əlaqə saxlayaq!</h2>
        <h4>Bizimlə əlaqə</h4>
        <a href="tel:166">Telefon</a>
        <a href="tel:+994%2010%20123%2001%2066">Mobil telefon</a>
        <p>+994 10 123 01 66</p>
        <a href="tel:+994%2050%20285%2044%2077">Mobil telefon</a>
        <p>+994 50 285 44 77</p>
        <a href="https://www.google.com/maps/place/134+Shafayat+Mehdiyev+St">Ünvan</a>
        <h4>Suallarınız var?</h4>
      `,
      acf: {
        telefon: "166",
        mobil_telefon: "+99450 285 44 77",
        mobil_telefon_link: "tel:+994502854477",
        unvan: "Şəfayət Mehdiyev 134, Baku, Azerbaijan",
        email: "info@166temizlik.az",
        whatsapp_link: "https://api.whatsapp.com/send?phone=994502854477&text=Salam",
        "qisa_mətn": "Xidmətlərimiz haqqında ətraflı öyrənmək istəyirsiniz?",
      },
    },
    null,
    "az",
  );

  assert.equal(data.formTitle, "Müraciət et, biz əlaqə saxlayaq!");
  assert.equal(data.contactTitle, "Bizimlə əlaqə");
  assert.equal(data.questionsTitle, "Suallarınız var?");
  assert.equal(data.shortText, "Xidmətlərimiz haqqında ətraflı öyrənmək istəyirsiniz?");
  assert.equal(data.email.value, "info@166temizlik.az");
  assert.equal(data.address.value, "Şəfayət Mehdiyev 134, Baku, Azerbaijan");
  assert.equal(data.address.href, "https://www.google.com/maps/place/134+Shafayat+Mehdiyev+St");
  assert.deepEqual(
    data.phones.map((item) => [item.value, item.href]),
    [
      ["166", "tel:166"],
      ["+994 10 123 01 66", "tel:+994%2010%20123%2001%2066"],
      ["+994 50 285 44 77", "tel:+994%2050%20285%2044%2077"],
    ],
  );
});

test("buildContactPageData falls back to settings when page fields are absent", async () => {
  const { buildContactPageData } = await importTypeScriptModule("src/lib/contact-page-data.ts");

  const data = buildContactPageData(
    {
      title: "",
      excerpt: "",
      content: "",
      acf: {},
    },
    {
      phonePrimary: "166",
      phoneSecondary: "+994 50 285 44 77",
      email: "office@example.test",
      address: "Fallback address",
      locationUrl: "https://maps.example.test",
    },
    "az",
  );

  assert.equal(data.email.value, "office@example.test");
  assert.equal(data.address.value, "Fallback address");
  assert.equal(data.address.href, "https://maps.example.test");
  assert.deepEqual(
    data.phones.map((item) => item.value),
    ["166", "+994 50 285 44 77"],
  );
});
