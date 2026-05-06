import Image from "next/image";
import Link from "next/link";

export function PageHero({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <section className="bg-[#eef6ff] py-16 max-md:py-10">
      <div className="container-shell text-center">
        <h1 className="text-[34px] font-bold leading-tight text-black max-md:text-[28px]">{title}</h1>
        {subtitle ? <p className="mx-auto mt-4 max-w-[720px] text-[17px] leading-7 text-[#344054] max-md:text-[15px]">{subtitle}</p> : null}
      </div>
    </section>
  );
}

export function SplitContent({
  title,
  text,
  image,
  reverse,
}: {
  title: string;
  text: string;
  image: string;
  reverse?: boolean;
}) {
  return (
    <section className="bg-white py-14 max-md:py-10">
      <div className={`container-shell grid grid-cols-2 items-center gap-14 max-lg:grid-cols-1 ${reverse ? "lg:[&>div:first-child]:order-2" : ""}`}>
        <div>
          <h2 className="text-[26px] font-bold leading-tight text-black max-md:text-[22px]">{title}</h2>
          <p className="mt-5 text-[16px] leading-8 text-black/80 max-md:text-[15px]">{text}</p>
        </div>
        <div className="relative min-h-[320px] overflow-hidden rounded-[16px] bg-[#e4f1ff] shadow-[0_16px_36px_rgb(15_23_42_/_8%)] max-md:min-h-[230px]">
          <Image src={image} alt={title} fill sizes="(max-width: 1024px) 100vw, 560px" className="object-cover" />
        </div>
      </div>
    </section>
  );
}

export function CardGrid({
  items,
}: {
  items: Array<{ title: string; text?: string; image?: string; href?: string; icon?: string }>;
}) {
  return (
    <div className="grid grid-cols-3 gap-6 max-lg:grid-cols-2 max-sm:grid-cols-1">
      {items.map((item) => {
        const body = (
          <article className="h-full overflow-hidden rounded-[16px] bg-white shadow-[0_14px_34px_rgb(15_23_42_/_8%)] transition hover:-translate-y-1">
            {item.image || item.icon ? (
              <div className="relative h-[230px] bg-[#eef6ff]">
                <Image src={item.image ?? item.icon ?? ""} alt={item.title} fill sizes="(max-width: 768px) 100vw, 360px" className={item.icon ? "object-contain p-10" : "object-cover"} />
              </div>
            ) : null}
            <div className="p-6">
              <h2 className="text-[20px] font-bold leading-tight text-black">{item.title}</h2>
              {item.text ? <p className="mt-3 text-[15px] leading-7 text-black/75">{item.text}</p> : null}
              {item.href ? <span className="mt-5 inline-block rounded-full bg-brand-blue px-6 py-3 text-[13px] font-bold text-white">Daha ətraflı</span> : null}
            </div>
          </article>
        );

        return item.href ? (
          <Link key={item.title} href={item.href} prefetch={false} className="block">
            {body}
          </Link>
        ) : (
          <div key={item.title}>{body}</div>
        );
      })}
    </div>
  );
}

export function LightSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <section className={`bg-[#f5f5f5] py-16 max-md:py-10 ${className}`}>{children}</section>;
}
