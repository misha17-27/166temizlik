"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { heroSlides } from "@/lib/site-data";

type Slide = (typeof heroSlides)[number];

export function HeroSlider({ slides = heroSlides }: { slides?: Slide[] }) {
  const [active, setActive] = useState(0);
  const slide = slides[active];

  useEffect(() => {
    const id = window.setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
    }, 5200);

    return () => window.clearInterval(id);
  }, [slides.length]);

  return (
    <section className="blue-band">
      <div className="container-shell relative grid min-h-[620px] grid-cols-[0.9fr_1.1fr] items-center gap-12 py-14 max-lg:min-h-[540px] max-lg:grid-cols-1 max-lg:gap-8 max-lg:py-8 max-sm:min-h-0">
        <button
          aria-label="Previous slide"
          className="absolute left-[-70px] top-1/2 text-6xl font-light text-black/80 max-xl:hidden"
          onClick={() => setActive((active - 1 + slides.length) % slides.length)}
        >
          ‹
        </button>
        <div className="order-2 max-lg:order-2 max-lg:text-center">
          <p className="max-w-[560px] text-[30px] font-extrabold leading-[1.28] tracking-normal text-white max-lg:mx-auto max-md:text-[22px]">
            {slide.eyebrow}
          </p>
          <h1 className="mt-4 text-[64px] font-black leading-none tracking-normal text-white max-lg:text-[52px] max-md:text-[40px]">
            {slide.title}
          </h1>
        </div>

        <div className="order-3 grid grid-cols-3 items-stretch gap-2 max-lg:order-1 max-lg:mx-auto max-lg:w-full max-lg:max-w-[520px]">
          {slide.images.map((src, index) => (
            <div
              key={`${src}-${index}`}
              className="relative h-[430px] overflow-hidden rounded-[34px] border-4 border-white/80 bg-white/20 max-lg:h-[250px] max-sm:h-[216px] max-sm:rounded-[22px]"
            >
              <Image
                src={src}
                alt="166 Təmizlik xidməti"
                fill
                loading={index === 0 ? "eager" : "lazy"}
                sizes="(max-width: 768px) 32vw, 280px"
                className="object-cover"
              />
            </div>
          ))}
        </div>

        <button
          aria-label="Next slide"
          className="absolute right-[-70px] top-1/2 text-6xl font-light text-black/80 max-xl:hidden"
          onClick={() => setActive((active + 1) % slides.length)}
        >
          ›
        </button>

        <div className="absolute bottom-10 left-1/2 flex -translate-x-1/2 gap-3 max-lg:bottom-5">
          {slides.map((item, index) => (
            <button
              key={item.title}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-2.5 w-2.5 rounded-full ${active === index ? "bg-black" : "bg-black/25"}`}
              onClick={() => setActive(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
