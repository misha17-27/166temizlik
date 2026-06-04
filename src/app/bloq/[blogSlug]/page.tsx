import { BlogPostContent } from "@/app/[slug]/page";
import { getBlogPostHref } from "@/lib/routes";
import { buildWordPressMetadata, getWordPressPost, stripHtml } from "@/lib/wordpress";

export async function generateMetadata({ params }: { params: Promise<{ blogSlug: string }> }) {
  const { blogSlug } = await params;
  const post = await getWordPressPost(blogSlug).catch(() => null);

  return buildWordPressMetadata(post?.seo, {
    title: post?.title ? `${post.title} - 166 TÉ™mizlik` : "166 TÉ™mizlik",
    description: post ? stripHtml(post.excerpt || post.content) : undefined,
    canonical: post ? getBlogPostHref(post.slug, "az") : undefined,
  });
}

export default async function BlogDetailPage({ params }: { params: Promise<{ blogSlug: string }> }) {
  const { blogSlug } = await params;
  return <BlogPostContent slug={blogSlug} />;
}
