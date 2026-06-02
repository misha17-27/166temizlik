"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type PointerEvent, type TouchEvent } from "react";
import { heroSlides, type HeroSlide } from "@/lib/site-data";

export function HeroSlider({ slides = heroSlides }: { slides?: HeroSlide[] }) {
  const [active, setActive] = useState(0);
  const dragStartRef = useRef<{ x: number; y: number; pointerId: number } | null>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const lastSwipeAtRef = useRef(0);
  const slide = slides[active];
  const showPrevious = useCallback(() => {
    setActive((current) => (current - 1 + slides.length) % slides.length);
  }, [slides.length]);
  const showNext = useCallback(() => {
    setActive((current) => (current + 1) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    if (slides.length < 2) {
      return;
    }

    const id = window.setInterval(() => {
      showNext();
    }, 5200);

    return () => window.clearInterval(id);
  }, [showNext, slides.length]);

  const completeSwipe = useCallback(
    (deltaX: number, deltaY: number) => {
      const now = Date.now();
      if (now - lastSwipeAtRef.current < 350) {
        return;
      }

      if (Math.abs(deltaX) < 45 || Math.abs(deltaX) < Math.abs(deltaY) * 1.2) {
        return;
      }

      lastSwipeAtRef.current = now;
      if (deltaX > 0) {
        showPrevious();
      } else {
        showNext();
      }
    },
    [showNext, showPrevious],
  );

  const onPointerDown = (event: PointerEvent<HTMLElement>) => {
    if (slides.length < 2 || (event.target as HTMLElement).closest("button")) {
      return;
    }

    dragStartRef.current = { x: event.clientX, y: event.clientY, pointerId: event.pointerId };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerUp = (event: PointerEvent<HTMLElement>) => {
    const start = dragStartRef.current;
    dragStartRef.current = null;

    if (!start || start.pointerId !== event.pointerId) {
      return;
    }

    completeSwipe(event.clientX - start.x, event.clientY - start.y);
  };

  const onPointerCancel = () => {
    dragStartRef.current = null;
  };

  const onTouchStart = (event: TouchEvent<HTMLElement>) => {
    if (slides.length < 2 || (event.target as HTMLElement).closest("button")) {
      return;
    }

    const touch = event.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const onTouchEnd = (event: TouchEvent<HTMLElement>) => {
    const start = touchStartRef.current;
    touchStartRef.current = null;

    if (!start) {
      return;
    }

    const touch = event.changedTouches[0];
    completeSwipe(touch.clientX - start.x, touch.clientY - start.y);
  };

  return (
    <section
      className="relative h-[650px] touch-pan-y overflow-hidden bg-brand-blue max-md:h-[330px] max-md:bg-white"
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerCancel}
      onPointerLeave={onPointerCancel}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onTouchCancel={() => {
        touchStartRef.current = null;
      }}
    >
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
            fill
            preload={index === 0}
            sizes="(max-width: 768px) 1px, 100vw"
            className="hidden object-contain md:block"
          />
          <Image
            src={item.mobileImage}
            alt={index === active ? (slide?.title ?? "166 Təmizlik") : ""}
            fill
            preload={index === 0}
            sizes="(max-width: 768px) calc(100vw - 48px), 1px"
            className="object-contain md:hidden"
          />
        </div>
      ))}

      <div className="absolute inset-0">
        <button
          aria-label="Previous slide"
          className="absolute left-2 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center text-[#100e0e] transition hover:text-black max-md:hidden"
          onClick={showPrevious}
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-9 w-9 max-md:h-7 max-md:w-7" fill="none">
            <path d="m15 5-7 7 7 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <button
          aria-label="Next slide"
          className="absolute right-2 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center text-[#100e0e] transition hover:text-black max-md:hidden"
          onClick={showNext}
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
