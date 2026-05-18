"use client";

import Image from "next/image";
import { useState } from "react";
import { priceCircleImages, weeklyPrices } from "@/lib/site-data";
import { ClockIcon } from "@/components/ClockIcon";

type PackageVariant = "home" | "detail";

const styles = {
  home: {
    article: "relative rounded-[18px] bg-white px-10 pb-9 pt-20 shadow-[0_8px_24px_rgb(0_116_202_/_8%)] max-md:px-6",
    badge: "absolute -top-3 left-8 flex h-[44px] min-w-[158px] items-center justify-center gap-2 rounded-full px-8 text-[17px] font-semibold text-white max-md:left-1/2 max-md:-translate-x-1/2",
    icon: "h-[18px] w-[18px]",
    list: "min-h-[180px] space-y-2 text-[18px] font-normal leading-[1.38] text-black max-md:text-[15px]",
    toggle: "mt-3 inline-block text-[17px] text-[#006ed3] underline underline-offset-2",
    grid: "mt-7 grid grid-cols-3 gap-4",
    label: "mb-2 text-[16px] font-semibold text-black max-md:text-[13px]",
    circle: "relative mx-auto grid h-[100px] w-[100px] place-items-center max-md:h-[78px] max-md:w-[78px]",
    price: "relative text-[26px] font-semibold text-white max-md:text-[20px]",
    imageSize: "100px",
  },
  detail: {
    article: "relative mx-5 rounded-[20px] bg-white px-5 pb-[50px] pt-[72px] shadow-[0_0_10px_rgb(228_239_255_/_50%)] max-md:mx-0 max-md:px-5",
    badge: "absolute left-5 top-[-10px] flex h-[42px] min-w-[158px] items-center justify-center gap-2 rounded-full px-10 text-[18px] font-medium leading-[18px] text-white max-md:left-1/2 max-md:-translate-x-1/2",
    icon: "h-[18px] w-[18px]",
    list: "min-h-[189px] space-y-0 text-[18px] font-normal leading-[27px] text-black max-md:text-[15px] max-md:leading-[22px]",
    toggle: "mt-3 inline-block text-[13px] text-[#006ed3] underline underline-offset-2",
    grid: "mt-6 grid grid-cols-3 gap-4",
    label: "mb-2 text-[16px] font-medium leading-[16px] text-black max-md:text-[13px]",
    circle: "relative mx-auto grid h-[100px] w-[100px] place-items-center max-md:h-[78px] max-md:w-[78px]",
    price: "relative text-[26px] font-semibold leading-[26px] text-white max-md:text-[20px]",
    imageSize: "100px",
  },
} satisfies Record<PackageVariant, Record<string, string>>;

export function CleaningPackageCard({
  title,
  items,
  priceKey,
  tone,
  variant = "home",
  weeklyItems = weeklyPrices,
  toggleLabels = { more: "Daha çox", less: "Daha az" },
}: {
  title: string;
  items: string[];
  priceKey: "four" | "eight";
  tone: "blue" | "yellow";
  variant?: PackageVariant;
  weeklyItems?: typeof weeklyPrices;
  toggleLabels?: { more: string; less: string };
}) {
  const [expanded, setExpanded] = useState(false);
  const style = styles[variant];
  const isExpandable = variant !== "detail" && priceKey === "eight" && items.length > 5;
  const visibleItems = isExpandable && !expanded ? items.slice(0, 5) : items;
  const circleImage = priceKey === "four" ? priceCircleImages.four : priceCircleImages.eight;

  return (
    <article className={style.article}>
      <div className={`${style.badge} ${tone === "blue" ? "bg-[#1097ed]" : "bg-[#ffd000]"}`}>
        <ClockIcon className={style.icon} strokeWidth={2.15} />
        {title}
      </div>

      <ol className={style.list}>
        {visibleItems.map((item, index) => (
          <li key={item} className={isExpandable && !expanded && index > 2 ? "text-black/35" : ""}>
            {index + 1}. {item}
          </li>
        ))}
      </ol>

      {isExpandable ? (
        <button type="button" aria-expanded={expanded} onClick={() => setExpanded((value) => !value)} className={style.toggle}>
          {expanded ? toggleLabels.less : toggleLabels.more}
        </button>
      ) : null}

      <div className={style.grid}>
        {weeklyItems.map((price) => (
          <div key={price.label} className="text-center">
            <p className={style.label}>{price.label}</p>
            <div className={style.circle}>
              <Image src={circleImage} alt="" fill sizes={style.imageSize} className="object-contain" />
              <span className={style.price}>{price[priceKey]}</span>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}
