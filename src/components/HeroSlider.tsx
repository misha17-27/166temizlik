"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { heroSlides, type HeroSlide } from "@/lib/site-data";

export function HeroSlider({ slides = heroSlides }: { slides?: HeroSlide[] }) {
  const [active, setActive] = useState(0);
  const slide = slides[active];

  useEffect(() => {
    if (slides.length < 2) {
      return;
    }

    const id = window.setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
    }, 5200);

    return () => window.clearInterval(id);
  }, [slides.length]);

  return (
    <section className="relative h-[650px] overflow-hidden bg-brand-blue max-md:h-[330px] max-md:bg-white">
      {slides.map((item, index) => (
        <div
          key={`${item.desktopImage}-${index}`}
          aria-hidden={active !== index}
          style={{ backgroundColor: item.desktopBgColor }}
          className={`absolute inset-0 transition-opacity duration-700 max-md:inset-x-6 max-md:inset-y-[10px] max-md:overflow-hidden max-md:rounded-[12px] md:flex md:items-center md:justify-center ${
            active === index ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={item.desktopImage}
            alt={index === active ? (slide?.title ?? "166 Təmizlik") : ""}
            width={item.desktopWidth}
            height={item.desktopHeight}
            preload={index === 0}
            sizes={`(max-width: ${item.desktopWidth}px) 100vw, ${item.desktopWidth}px`}
            className="hidden h-auto w-full object-contain md:block"
          />
          <Image
            src={item.mobileImage}
            alt={index === active ? (slide?.title ?? "166 Təmizlik") : ""}
            fill
            preload={index === 0}
            sizes="(max-width: 768px) 100vw"
            className="object-contain md:hidden"
          />
        </div>
      ))}

      <div className="absolute inset-0">
        <button
          aria-label="Previous slide"
          className="absolute left-2 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center text-[#100e0e] transition hover:text-black max-md:hidden"
          onClick={() => setActive((active - 1 + slides.length) % slides.length)}
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-9 w-9 max-md:h-7 max-md:w-7" fill="none">
            <path d="m15 5-7 7 7 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <button
          aria-label="Next slide"
          className="absolute right-2 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center text-[#100e0e] transition hover:text-black max-md:hidden"
          onClick={() => setActive((active + 1) % slides.length)}
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-9 w-9 max-md:h-7 max-md:w-7" fill="none">
            <path d="m9 5 7 7-7 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <div className="absolute bottom-[18px] left-1/2 z-10 hidden -translate-x-1/2 items-center gap-[10px] max-md:flex">
        {slides.map((item, index) => (
          <button
            key={`hero-dot-${item.mobileImage}-${index}`}
            type="button"
            aria-label={`Go to slide ${index + 1}`}
            aria-current={active === index}
            onClick={() => setActive(index)}
            className={`h-[6px] w-[6px] rounded-full transition ${active === index ? "bg-black" : "bg-black/20"}`}
          />
        ))}
      </div>
    </section>
  );
}
