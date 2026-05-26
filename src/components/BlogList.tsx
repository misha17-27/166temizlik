"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { getBlogPostHref, type Locale } from "@/lib/routes";

type BlogPost = {
  slug: string;
  title: string;
  image: string;
  excerpt: string;
};

export function BlogList({ posts, readMore, locale = "az" }: { posts: BlogPost[]; readMore: string; locale?: Locale }) {
  const perPage = 9;
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(posts.length / perPage);
  const visiblePosts = useMemo(() => posts.slice((page - 1) * perPage, page * perPage), [page, posts]);

  return (
    <>
      <div className="container-shell grid grid-cols-3 gap-x-9 gap-y-10 max-lg:grid-cols-2 max-sm:grid-cols-1">
        {visiblePosts.map((post) => (
          <article key={post.slug} className="bg-white">
            <Link href={getBlogPostHref(post.slug, locale)} className="group block">
              <div className="relative h-[245px] overflow-hidden">
                <Image src={post.image} alt={post.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition duration-300 group-hover:scale-[1.03]" />
              </div>
              <div className="px-6 pb-9 pt-6">
                <h2 className="min-h-[50px] text-[18px] font-bold leading-[1.2] text-black">{post.title}</h2>
                <p className="mt-4 line-clamp-5 text-[13px] font-normal leading-[1.65] text-[#686868]">{post.excerpt}</p>
                <span className="mt-7 inline-flex rounded-full bg-brand-yellow px-6 py-3 text-[12px] font-bold text-black transition-colors group-hover:bg-black group-hover:text-white">
                  {readMore}
                </span>
              </div>
            </Link>
          </article>
        ))}
      </div>
      {totalPages > 1 ? (
        <div className="mt-12 flex justify-center gap-3 text-[16px] font-semibold">
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setPage(item)}
              className={`grid h-10 w-10 place-items-center rounded-full border transition-colors ${
                item === page ? "border-brand-blue bg-brand-blue text-white" : "border-transparent bg-white text-black hover:border-brand-blue hover:text-brand-blue"
              }`}
              aria-current={item === page ? "page" : undefined}
            >
              {item}
            </button>
          ))}
        </div>
      ) : null}
    </>
  );
}
