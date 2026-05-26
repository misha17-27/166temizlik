import { revalidatePath, revalidateTag } from "next/cache";

type RevalidatePayload = {
  secret?: string;
  tags?: string[];
  paths?: string[];
  post_type?: string;
  type?: string;
  slug?: string;
  language?: string;
  lang?: string;
};

function unique(values: string[]) {
  return Array.from(new Set(values.filter(Boolean)));
}

function normalizePath(path: string) {
  return path.startsWith("/") ? path : `/${path}`;
}

export async function POST(request: Request) {
  const configuredSecret = process.env.ONE66_REVALIDATE_SECRET;

  if (!configuredSecret) {
    return Response.json({ error: "Revalidation secret is not configured" }, { status: 500 });
  }

  let payload: RevalidatePayload = {};
  const contentType = request.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    payload = (await request.json().catch(() => ({}))) as RevalidatePayload;
  }

  const url = new URL(request.url);
  const providedSecret =
    request.headers.get("x-revalidate-secret") ??
    url.searchParams.get("secret") ??
    payload.secret;

  if (providedSecret !== configuredSecret) {
    return Response.json({ error: "Invalid revalidation secret" }, { status: 401 });
  }

  const contentTypeTag = payload.type ?? payload.post_type;
  const language = payload.lang ?? payload.language;
  const baseTags = [
    "wordpress",
    language ? `wordpress:${language}` : "",
    contentTypeTag ? `wordpress:${contentTypeTag}` : "",
    payload.slug && contentTypeTag ? `wordpress:${contentTypeTag}:${payload.slug}` : "",
  ];
  const tags = unique([...baseTags, ...(payload.tags ?? [])]);
  const paths = unique((payload.paths ?? []).map(normalizePath));

  tags.forEach((tag) => revalidateTag(tag, { expire: 0 }));
  paths.forEach((path) => revalidatePath(path));

  return Response.json({
    revalidated: true,
    tags,
    paths,
    now: new Date().toISOString(),
  });
}
