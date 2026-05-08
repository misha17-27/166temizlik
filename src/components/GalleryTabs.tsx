"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

type GalleryCategoryKey =
  | "home-office"
  | "garden"
  | "area"
  | "facade"
  | "curtains"
  | "furniture"
  | "fragrance"
  | "restaurant-hotel";

type GalleryItem = {
  src: string;
  categories: GalleryCategoryKey[];
  height: number;
};

const categoryKeys: GalleryCategoryKey[] = [
  "home-office",
  "garden",
  "area",
  "facade",
  "curtains",
  "furniture",
  "fragrance",
  "restaurant-hotel",
];

const galleryItems: GalleryItem[] = [
  { src: "https://166temizlik.az/wp-content/uploads/2023/05/J1A7696.jpg", categories: ["home-office", "restaurant-hotel"], height: 331 },
  { src: "https://166temizlik.az/wp-content/uploads/2023/03/IMG-20230309-WA0033-1.jpg", categories: ["furniture"], height: 265 },
  { src: "https://166temizlik.az/wp-content/uploads/2023/03/20230126_150229.jpg", categories: ["home-office"], height: 265 },
  { src: "https://166temizlik.az/wp-content/uploads/2023/03/IMG-20230309-WA0036.jpg", categories: ["home-office"], height: 265 },
  { src: "https://166temizlik.az/wp-content/uploads/2023/07/IMG_20230620_174225_799.webp", categories: ["garden"], height: 471 },
  { src: "https://166temizlik.az/wp-content/uploads/2023/07/ev-temizliyiiii.webp", categories: ["home-office"], height: 205 },
  { src: "https://166temizlik.az/wp-content/uploads/2023/05/J1A8224.jpg", categories: ["home-office"], height: 177 },
  { src: "https://166temizlik.az/wp-content/uploads/2023/07/metbex-temizliyi4.webp", categories: ["home-office"], height: 397 },
  { src: "https://166temizlik.az/wp-content/uploads/2023/03/IMG-20230309-WA0007.jpg", categories: ["home-office"], height: 265 },
  { src: "https://166temizlik.az/wp-content/uploads/2023/07/pencere-temizliyi-metbex-temizliyi...webp", categories: ["home-office"], height: 331 },
  { src: "https://166temizlik.az/wp-content/uploads/2023/03/20230205_130150.jpg", categories: ["home-office"], height: 574 },
  { src: "https://166temizlik.az/wp-content/uploads/2023/02/etir-1.jpg", categories: ["fragrance"], height: 222 },
  { src: "https://166temizlik.az/wp-content/uploads/2023/02/yum-1.jpg", categories: ["furniture"], height: 265 },
  { src: "https://166temizlik.az/wp-content/uploads/2023/07/soba-temizliyi-metbex-temizliyi2.webp", categories: ["home-office"], height: 331 },
  { src: "https://166temizlik.az/wp-content/uploads/2023/02/a82b7e7026a2410748fdc70a6edb9d94-1-1.png", categories: ["curtains"], height: 150 },
  { src: "https://166temizlik.az/wp-content/uploads/2023/05/DSC08216.jpg", categories: ["curtains"], height: 285 },
  { src: "https://166temizlik.az/wp-content/uploads/2023/02/d5c3ac01d06ff9e8c0212c7d623d5b24-1-1.png", categories: ["fragrance"], height: 260 },
  { src: "https://166temizlik.az/wp-content/uploads/2023/07/metbex-temizliyi-2.webp", categories: ["home-office"], height: 300 },
  { src: "https://166temizlik.az/wp-content/uploads/2023/02/4ba2a6810f64ca3c6902a854decfb38a-1-1.png", categories: ["fragrance"], height: 255 },
  { src: "https://166temizlik.az/wp-content/uploads/2023/07/soba-temizliyi-metbex-temizliyi.webp", categories: ["home-office"], height: 330 },
  { src: "https://166temizlik.az/wp-content/uploads/2023/07/metbextemizliyi8.webp", categories: ["home-office"], height: 300 },
  { src: "https://166temizlik.az/wp-content/uploads/2023/07/IMG_20230620_174231_811.webp", categories: ["garden"], height: 330 },
  { src: "https://166temizlik.az/wp-content/uploads/2023/07/mertbex-temizliyi-7.webp", categories: ["home-office"], height: 300 },
  { src: "https://166temizlik.az/wp-content/uploads/2023/07/IMG_20230620_174232_475.webp", categories: ["garden"], height: 330 },
  { src: "https://166temizlik.az/wp-content/uploads/2023/07/metbex-temizliyi6.webp", categories: ["home-office"], height: 300 },
  { src: "https://166temizlik.az/wp-content/uploads/2023/07/ev-temizliyi-hem-de-hamam-temizliyine-geder.webp", categories: ["home-office"], height: 330 },
  { src: "https://166temizlik.az/wp-content/uploads/2023/07/ev-temizliyi-3.webp", categories: ["home-office"], height: 330 },
  { src: "https://166temizlik.az/wp-content/uploads/2023/03/IMG-20230309-WA0021.jpg", categories: ["home-office"], height: 330 },
  { src: "https://166temizlik.az/wp-content/uploads/2023/03/20230223_113905.jpg", categories: ["area"], height: 300 },
  { src: "https://166temizlik.az/wp-content/uploads/2023/07/metbex-temizliyi5.webp", categories: ["home-office"], height: 300 },
  { src: "https://166temizlik.az/wp-content/uploads/2023/02/erazi2-1-1.jpg", categories: ["area"], height: 275 },
  { src: "https://166temizlik.az/wp-content/uploads/2023/02/erazi3-1-1.jpg", categories: ["area"], height: 275 },
  { src: "https://166temizlik.az/wp-content/uploads/2023/02/fasad1-1.jpg", categories: ["facade"], height: 260 },
  { src: "https://166temizlik.az/wp-content/uploads/2023/02/fasad2-1.jpg", categories: ["facade"], height: 300 },
  { src: "https://166temizlik.az/wp-content/uploads/2023/03/fasad.webp", categories: ["facade"], height: 280 },
  { src: "https://166temizlik.az/wp-content/uploads/2023/05/J1A7451.jpg", categories: ["restaurant-hotel"], height: 300 },
  { src: "https://166temizlik.az/wp-content/uploads/2023/05/J1A7802.jpg", categories: ["restaurant-hotel"], height: 300 },
  { src: "https://166temizlik.az/wp-content/uploads/2024/12/HRS03405-1.webp", categories: ["restaurant-hotel"], height: 300 },
];

const defaultOrder = [0, 32, 12, 6, 33, 9, 1, 7, 34, 11, 14, 4, 15, 36, 30, 17, 22, 28, 23, 19, 37, 2, 31, 35, 3, 5, 8, 10, 13, 16, 18, 20, 21, 24, 25, 26, 27, 29];

function getItems(category: GalleryCategoryKey | null) {
  if (!category) {
    return defaultOrder.map((index) => galleryItems[index]).filter(Boolean);
  }

  return galleryItems.filter((item) => item.categories.includes(category));
}

export function GalleryTabs({ categories, moreLabel }: { categories: string[]; moreLabel: string }) {
  const [activeCategory, setActiveCategory] = useState<GalleryCategoryKey | null>(null);
  const [visibleCount, setVisibleCount] = useState(15);

  const visibleItems = useMemo(() => getItems(activeCategory).slice(0, visibleCount), [activeCategory, visibleCount]);
  const allItems = getItems(activeCategory);

  function selectCategory(category: GalleryCategoryKey) {
    setActiveCategory(category);
    setVisibleCount(12);
  }

  return (
    <>
      <div className="mx-auto mt-9 flex max-w-[980px] flex-wrap justify-center gap-x-5 gap-y-4 text-center text-[17px] font-medium text-[#333] max-md:mt-8 max-md:gap-x-3 max-md:text-[14px]">
        {categoryKeys.map((key, index) => {
          const isActive = activeCategory === key;

          return (
            <button
              key={key}
              type="button"
              onClick={() => selectCategory(key)}
              className={`rounded-[10px] border-2 px-[10px] py-[8px] leading-none transition-colors ${
                isActive ? "border-brand-blue text-brand-blue" : "border-white hover:border-brand-blue hover:text-brand-blue"
              }`}
            >
              {categories[index]}
            </button>
          );
        })}
      </div>

      <div className="mt-9 columns-4 gap-5 max-lg:columns-3 max-md:columns-2 max-sm:columns-1">
        {visibleItems.map((item, index) => (
          <a key={`${item.src}-${index}`} href={item.src} className="mb-5 block break-inside-avoid overflow-hidden rounded-[14px] bg-[#eef6ff]">
            <Image
              src={item.src}
              alt={`166 Təmizlik qalereya ${index + 1}`}
              width={360}
              height={item.height}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 25vw"
              className="w-full object-cover transition duration-500 hover:scale-105"
              style={{ height: `${item.height}px` }}
            />
          </a>
        ))}
      </div>

      {visibleCount < allItems.length ? (
        <div className="mt-12 text-center">
          <button
            type="button"
            onClick={() => setVisibleCount((count) => count + 9)}
            className="rounded-[3px] bg-brand-blue px-7 py-3 text-[13px] font-bold text-white transition-colors hover:bg-black"
          >
            {moreLabel.replace("⌄", "")}
          </button>
        </div>
      ) : null}

      <div className="mx-auto mt-10 max-w-[1120px] overflow-hidden rounded-[14px] bg-black">
        <iframe
          className="aspect-video w-full"
          src="https://www.youtube.com/embed/BXwEEGgWVO0"
          title="Temiz Evim Pencere temizliyi nece olmalıdır?"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    </>
  );
}
