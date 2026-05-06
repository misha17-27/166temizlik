import Image from "next/image";
import { SitePage } from "@/components/SiteChrome";
import { blogPosts, pageHeroAssets } from "@/lib/pages-data";

export const metadata = {
  title: "Bloq - 166 Təmizlik",
};

export default function BlogPage() {
  return (
    <SitePage active="about">
      <section className="bg-[#f5f5f5]">
        <div className="container-shell relative h-[395px] overflow-hidden max-md:h-[260px]">
          <Image src={pageHeroAssets.blog} alt="Bloq" fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-black/35" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
            <h1 className="text-[36px] font-bold leading-tight max-md:text-[30px]">Bloq</h1>
            <p className="mt-2 text-[18px] font-semibold max-md:text-[15px]">Sevdiklərinizə və özünüzə zaman ayırın!</p>
          </div>
        </div>
      </section>

      <section className="bg-[#f5f5f5] py-8 pb-24">
        <div className="container-shell grid grid-cols-3 gap-x-9 gap-y-10 max-lg:grid-cols-2 max-sm:grid-cols-1">
          {blogPosts.map((post) => (
            <article key={post.title} className="bg-white">
              <div className="relative h-[245px] overflow-hidden">
                <Image src={post.image} alt={post.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
              </div>
              <div className="px-6 pb-9 pt-6">
                <h2 className="min-h-[50px] text-[18px] font-bold leading-[1.2] text-black">{post.title}</h2>
                <p className="mt-4 line-clamp-5 text-[13px] font-normal leading-[1.65] text-[#686868]">{post.excerpt}</p>
                <button className="mt-7 rounded-full bg-brand-yellow px-6 py-3 text-[12px] font-bold text-black">
                  Daha ətraflı »
                </button>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-12 flex justify-center gap-4 text-[16px] font-semibold">
          <span className="text-brand-blue">1</span>
          <span>2</span>
        </div>
      </section>
    </SitePage>
  );
}
