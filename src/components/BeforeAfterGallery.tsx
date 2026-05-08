"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { beforeAfter } from "@/lib/site-data";

type BeforeAfterCopy = {
  title: string;
  accent: string;
  beforeLabel: string;
  afterLabel: string;
};

const defaultCopy: BeforeAfterCopy = {
  title: "GÖRDÜYÜMÜZ",
  accent: "İŞLƏR",
  beforeLabel: "Əvvəl",
  afterLabel: "Sonra",
};

function clamp(value: number) {
  return Math.min(92, Math.max(8, value));
}

export function BeforeAfterGallery({
  partnerLogos = [],
  partnerTitle = "PARTNYORLAR",
  copy = defaultCopy,
}: {
  partnerLogos?: string[];
  partnerTitle?: string;
  copy?: BeforeAfterCopy;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [divider, setDivider] = useState(60);
  const [dragging, setDragging] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);
  const active = beforeAfter[activeIndex];
  const beforeClip = `inset(0 ${100 - divider}% 0 0)`;

  function updateDivider(clientX: number) {
    const frame = frameRef.current;

    if (!frame) {
      return;
    }

    const rect = frame.getBoundingClientRect();
    const nextValue = ((clientX - rect.left) / rect.width) * 100;
    setDivider(clamp(nextValue));
  }

  return (
    <section id="gallery" data-section="before-after" className="bg-white py-16 max-md:py-10">
      <div className="mx-auto w-[min(var(--site-container),calc(100%-40px))] rounded-[14px] bg-[#e4f1ff] px-[70px] pb-14 pt-8 max-lg:px-10 max-md:w-[calc(100%-30px)] max-md:px-4 max-md:pb-8">
        <div className="mb-8 text-center [font-family:var(--font-montserrat)] text-[23px] font-bold uppercase leading-tight tracking-normal text-black max-md:mb-5 max-md:text-[18px]">
          {copy.title} <span className="ml-2 font-normal text-brand-blue">{copy.accent}</span>
        </div>

        <div
          ref={frameRef}
          data-before-after-frame
          className="relative mx-auto aspect-[867/640] w-full max-w-[640px] cursor-ew-resize select-none overflow-hidden bg-white shadow-[0_1px_0_rgb(0_0_0_/_8%)] max-md:max-w-full"
          onPointerDown={(event) => {
            setDragging(true);
            event.currentTarget.setPointerCapture(event.pointerId);
            updateDivider(event.clientX);
          }}
          onPointerMove={(event) => {
            if (dragging) {
              updateDivider(event.clientX);
            }
          }}
          onPointerUp={() => setDragging(false)}
          onPointerCancel={() => setDragging(false)}
        >
          <Image src={active.after} alt={`${active.title} ${copy.afterLabel}`} fill sizes="640px" className="object-cover" priority />
          <Image
            src={active.before}
            alt={`${active.title} ${copy.beforeLabel}`}
            fill
            sizes="640px"
            className="object-cover"
            style={{ clipPath: beforeClip }}
            priority
          />

          <span className="absolute left-2 top-2 bg-brand-yellow px-2 py-1 [font-family:var(--font-montserrat)] text-[10px] font-semibold text-black">
            {copy.beforeLabel}
          </span>
          <span className="absolute right-2 top-2 bg-brand-yellow px-2 py-1 [font-family:var(--font-montserrat)] text-[10px] font-semibold text-black">
            {copy.afterLabel}
          </span>

          <div className="absolute inset-y-0 z-10 w-[2px] bg-white shadow-[0_0_0_1px_rgb(0_78_160_/_35%)]" style={{ left: `${divider}%` }} />
          <button
            type="button"
            aria-label="Şəkil müqayisə ştorunu sürüşdür"
            className="absolute top-1/2 z-20 grid h-8 w-8 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[#00419d] text-[#ffd600] shadow-[0_4px_12px_rgb(0_0_0_/_25%)]"
            style={{ left: `${divider}%` }}
            onKeyDown={(event) => {
              if (event.key === "ArrowLeft") {
                setDivider((value) => clamp(value - 5));
              }

              if (event.key === "ArrowRight") {
                setDivider((value) => clamp(value + 5));
              }
            }}
          >
            <svg aria-hidden="true" viewBox="0 0 26 18" className="h-[14px] w-[20px]" fill="none">
              <path d="M10.3 4.1 6 9l4.3 4.9" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M15.7 4.1 20 9l-4.3 4.9" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        <div className="mt-10 flex justify-center gap-2 max-md:mt-7">
          {beforeAfter.map((item, index) => (
            <button
              type="button"
              key={item.title}
              data-before-after-dot={index}
              aria-label={`${index + 1} müqayisə`}
              className={`h-2 w-2 rounded-full ${activeIndex === index ? "bg-[#0074ca]" : "bg-[#7a8794]"}`}
              onClick={() => {
                setActiveIndex(index);
                setDivider(60);
              }}
            />
          ))}
        </div>

        <div className="mx-auto mt-8 grid max-w-[970px] grid-cols-4 gap-2 max-md:grid-cols-2">
          {beforeAfter.map((item, index) => (
            <button
              type="button"
              key={item.title}
              data-before-after-thumb={index}
              aria-label={`${item.title} müqayisəsini göstər`}
              className={`group relative aspect-[1.55] overflow-hidden rounded-[6px] bg-white ring-2 transition ${
                activeIndex === index ? "ring-[#0074ca]" : "ring-transparent"
              }`}
              onClick={() => {
                setActiveIndex(index);
                setDivider(60);
              }}
            >
              <Image src={item.after} alt={item.title} fill sizes="180px" className="object-cover transition group-hover:scale-105" />
              <Image src={item.before} alt="" fill sizes="180px" className="object-cover" style={{ clipPath: "inset(0 50% 0 0)" }} />
              <div className="absolute inset-y-0 left-1/2 w-px bg-white" />
            </button>
          ))}
        </div>

        {partnerLogos.length ? (
          <div className="mx-auto mt-10 max-w-[970px]">
            <h2 className="[font-family:var(--font-montserrat)] text-[24px] font-bold uppercase text-black max-md:text-[18px]">{partnerTitle}</h2>
            <div className="mt-5 overflow-hidden">
              <div className="partners-track flex w-max gap-7 max-md:gap-4">
                {[...partnerLogos, ...partnerLogos].map((src, index) => (
                  <div
                    key={`${src}-${index}`}
                    className="relative h-[90px] w-[160px] shrink-0 rounded-[14px] border border-[#d5dbe3] bg-white shadow-[0_6px_16px_rgb(15_23_42_/_4%)] max-md:h-[70px] max-md:w-[130px]"
                  >
                    <Image src={src} alt={`Partnyor ${index + 1}`} fill sizes="160px" className="object-contain p-5 max-md:p-4" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
