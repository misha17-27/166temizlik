"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";

type ServiceImageGalleryProps = {
  images: string[];
  title: string;
  layout?: "mosaic" | "row" | "quad" | "office" | "garden" | "area" | "chandelier";
};

export function ServiceImageGallery({ images, title, layout = "mosaic" }: ServiceImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const galleryImages = useMemo(() => images.filter(Boolean), [images]);

  const close = useCallback(() => setActiveIndex(null), []);
  const showPrevious = useCallback(() => {
    setActiveIndex((current) => (current === null ? current : (current - 1 + galleryImages.length) % galleryImages.length));
  }, [galleryImages.length]);
  const showNext = useCallback(() => {
    setActiveIndex((current) => (current === null ? current : (current + 1) % galleryImages.length));
  }, [galleryImages.length]);

  useEffect(() => {
    galleryImages.forEach((src) => {
      const image = new window.Image();
      image.src = src;
    });
  }, [galleryImages]);

  useEffect(() => {
    if (activeIndex === null) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
      }
      if (event.key === "ArrowLeft") {
        showPrevious();
      }
      if (event.key === "ArrowRight") {
        showNext();
      }
    };

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeIndex, close, showNext, showPrevious]);

  if (!galleryImages.length) {
    return null;
  }

  const imageButton = (src: string, index: number, className: string, sizes: string) => (
    <button
      key={`${src}-${index}`}
      type="button"
      onClick={() => setActiveIndex(index)}
      className={`group relative block overflow-hidden bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue ${className}`}
      aria-label={`${title} ${index + 1}`}
    >
      <Image src={src} alt={`${title} ${index + 1}`} fill sizes={sizes} className="object-cover transition duration-300 group-hover:scale-[1.04]" quality={100} unoptimized />
    </button>
  );

  return (
    <>
      {layout === "row" ? (
        <div className="grid w-full grid-cols-5 gap-[10px] max-lg:grid-cols-3 max-sm:grid-cols-2">
          {galleryImages.map((src, index) => imageButton(src, index, "h-[240px] max-lg:h-[210px] max-sm:h-[170px]", "(max-width: 900px) 33vw, 220px"))}
        </div>
      ) : layout === "quad" ? (
        <div className="grid w-full grid-cols-2 gap-[10px]">
          {galleryImages.slice(0, 4).map((src, index) => imageButton(src, index, "h-[190px] max-md:h-[155px]", "(max-width: 900px) 50vw, 240px"))}
        </div>
      ) : layout === "chandelier" ? (
        <div className="grid w-full grid-cols-2 gap-[10px] max-sm:grid-cols-1">
          {galleryImages.slice(0, 4).map((src, index) =>
            imageButton(src, index, `${index === 2 ? "h-[200px]" : "h-[376px]"} max-md:h-[220px]`, "(max-width: 900px) 50vw, 301px"),
          )}
        </div>
      ) : layout === "office" ? (
        <div className="grid w-full grid-cols-2 gap-[10px] max-sm:grid-cols-1">
          {galleryImages.slice(0, 4).map((src, index) =>
            imageButton(
              src,
              index,
              `${index === 2 ? "h-[451px]" : "h-[201px]"} max-md:h-[220px]`,
              "(max-width: 900px) 50vw, 301px",
            ),
          )}
        </div>
      ) : layout === "garden" ? (
        <div className="grid w-full grid-cols-2 gap-[10px] max-sm:grid-cols-1">
          {galleryImages.slice(0, 4).map((src, index) =>
            imageButton(
              src,
              index,
              `${index === 0 ? "h-[389px]" : index === 1 ? "h-[204px]" : "h-[376px]"} max-md:h-[240px]`,
              "(max-width: 900px) 50vw, 301px",
            ),
          )}
        </div>
      ) : layout === "area" ? (
        <div className="grid w-full grid-cols-2 gap-[10px] max-sm:grid-cols-1">
          <div className="flex flex-col gap-[10px]">
            {galleryImages.slice(0, 4).filter((_, index) => index % 2 === 0).map((src, index) =>
              imageButton(src, index * 2, `${index === 0 ? "h-[152px]" : "h-[451px]"} max-md:h-[220px]`, "(max-width: 900px) 50vw, 301px"),
            )}
          </div>
          <div className="flex flex-col gap-[10px]">
            {galleryImages.slice(0, 4).filter((_, index) => index % 2 === 1).map((src, index) =>
              imageButton(src, index * 2 + 1, `${index === 0 ? "h-[451px]" : "h-[164px]"} max-md:h-[220px]`, "(max-width: 900px) 50vw, 301px"),
            )}
          </div>
        </div>
      ) : (
        <div className="grid w-full grid-cols-4 gap-[10px] p-[10px] max-sm:grid-cols-2">
          {[0, 1, 2, 3].map((columnIndex) => (
            <div key={columnIndex} className="flex flex-col gap-[10px]">
              {[columnIndex, columnIndex + 4].map((imageIndex, rowIndex) =>
                imageButton(
                  galleryImages[imageIndex % galleryImages.length],
                  imageIndex % galleryImages.length,
                  `${(columnIndex + rowIndex) % 2 === 0 ? "h-[218px]" : "h-[182px]"} max-sm:h-[165px]`,
                  "(max-width: 640px) 50vw, (max-width: 900px) 25vw, 190px",
                ),
              )}
            </div>
          ))}
        </div>
      )}

      {activeIndex !== null ? (
        <div className="fixed inset-0 z-[200] bg-black/85 text-white" role="dialog" aria-modal="true" aria-label={title}>
          <div className="absolute left-6 top-6 text-[16px] font-medium">
            {activeIndex + 1} / {galleryImages.length}
          </div>
          <button type="button" onClick={close} className="absolute right-6 top-5 text-[42px] leading-none text-white" aria-label="Close">
            &times;
          </button>
          <button type="button" onClick={showPrevious} className="absolute left-8 top-1/2 -translate-y-1/2 text-[60px] leading-none text-white/90" aria-label="Previous">
            ‹
          </button>
          <button type="button" onClick={showNext} className="absolute right-8 top-1/2 -translate-y-1/2 text-[60px] leading-none text-white/90" aria-label="Next">
            ›
          </button>
          <div className="flex h-full items-center justify-center px-20 py-16 max-md:px-10">
            <button type="button" onClick={showNext} className="relative block h-[min(78vh,760px)] w-[min(78vw,1050px)]" aria-label="Next image">
              <Image src={galleryImages[activeIndex]} alt={`${title} ${activeIndex + 1}`} fill sizes="90vw" className="object-contain" priority unoptimized />
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
