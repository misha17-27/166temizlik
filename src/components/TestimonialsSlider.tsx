"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState, type PointerEvent } from "react";

type Testimonial = {
  name: string;
  image: string;
  text: string;
};

function getVisiblePerPage() {
  if (typeof window === "undefined") {
    return 3;
  }

  if (window.matchMedia("(max-width: 767px)").matches) {
    return 1;
  }

  if (window.matchMedia("(max-width: 1023px)").matches) {
    return 2;
  }

  return 3;
}

export function TestimonialsSlider({ items }: { items: Testimonial[] }) {
  const sliderItems = useMemo(() => items.slice(0, 9), [items]);
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const dragStartXRef = useRef(0);
  const dragStartScrollLeftRef = useRef(0);
  const [visiblePerPage, setVisiblePerPage] = useState(3);
  const [activePage, setActivePage] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const pageCount = Math.max(1, Math.ceil(sliderItems.length / visiblePerPage));
  const currentPage = Math.min(activePage, pageCount - 1);

  useEffect(() => {
    function syncVisiblePerPage() {
      setVisiblePerPage(getVisiblePerPage());
    }

    syncVisiblePerPage();
    window.addEventListener("resize", syncVisiblePerPage);

    return () => window.removeEventListener("resize", syncVisiblePerPage);
  }, []);

  useEffect(() => {
    if (pageCount <= 1 || isDragging) {
      return;
    }

    const timer = window.setInterval(() => {
      const scroller = scrollerRef.current;
      if (!scroller) {
        return;
      }

      const page = Math.round(scroller.scrollLeft / Math.max(scroller.clientWidth, 1));
      scroller.scrollTo({ left: ((page + 1) % pageCount) * scroller.clientWidth, behavior: "smooth" });
    }, 4500);

    return () => window.clearInterval(timer);
  }, [isDragging, pageCount]);

  function handleScroll() {
    const scroller = scrollerRef.current;
    if (!scroller) {
      return;
    }

    setActivePage(Math.min(pageCount - 1, Math.round(scroller.scrollLeft / Math.max(scroller.clientWidth, 1))));
  }

  function scrollToPage(page: number) {
    const scroller = scrollerRef.current;
    if (!scroller) {
      return;
    }

    scroller.scrollTo({ left: page * scroller.clientWidth, behavior: "smooth" });
  }

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    if (event.button !== 0) {
      return;
    }

    const scroller = scrollerRef.current;
    if (!scroller) {
      return;
    }

    dragStartXRef.current = event.clientX;
    dragStartScrollLeftRef.current = scroller.scrollLeft;
    setIsDragging(true);
    try {
      scroller.setPointerCapture(event.pointerId);
    } catch {
      // Synthetic pointer events used by tests may not have an active pointer.
    }
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    const scroller = scrollerRef.current;
    if (!isDragging || !scroller) {
      return;
    }

    event.preventDefault();
    scroller.scrollLeft = dragStartScrollLeftRef.current - (event.clientX - dragStartXRef.current);
  }

  function finishDrag(event: PointerEvent<HTMLDivElement>) {
    const scroller = scrollerRef.current;
    if (!isDragging || !scroller) {
      return;
    }

    try {
      if (scroller.hasPointerCapture(event.pointerId)) {
        scroller.releasePointerCapture(event.pointerId);
      }
    } catch {
      // Pointer capture can already be gone after cancelled or synthetic events.
    }

    setIsDragging(false);
    scrollToPage(Math.min(pageCount - 1, Math.round(scroller.scrollLeft / Math.max(scroller.clientWidth, 1))));
  }

  return (
    <div>
      <div
        ref={scrollerRef}
        onScroll={handleScroll}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={finishDrag}
        onPointerCancel={finishDrag}
        className={`flex gap-6 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
          isDragging ? "cursor-grabbing snap-none scroll-auto select-none" : "cursor-grab snap-x snap-mandatory scroll-smooth"
        }`}
      >
        {sliderItems.map((item) => (
          <article
            key={item.name}
            className="min-w-[calc((100%-48px)/3)] snap-start rounded-[18px] bg-white p-8 text-center shadow-[0_14px_34px_rgb(15_23_42_/_8%)] max-lg:min-w-[calc((100%-24px)/2)] max-md:min-w-full"
          >
            <p className="text-6xl font-black leading-none text-brand-blue">“</p>
            <p className="min-h-[120px] text-[16px] font-semibold leading-7 text-[#344054]">{item.text}</p>
            <div className="relative mx-auto mt-6 h-[86px] w-[86px] overflow-hidden rounded-full">
              <Image src={item.image} alt={item.name} fill sizes="86px" className="object-cover" />
            </div>
            <h3 className="mt-4 text-[19px] font-black">{item.name}</h3>
            <p className="mt-2 text-2xl tracking-[4px] text-brand-yellow">★★★★★</p>
          </article>
        ))}
      </div>

      {pageCount > 1 ? (
        <div className="mt-5 flex justify-center gap-2">
          {Array.from({ length: pageCount }, (_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Show testimonials page ${index + 1}`}
              aria-current={currentPage === index ? "true" : undefined}
              onClick={() => scrollToPage(index)}
              className={`h-3 w-3 rounded-full transition-colors ${currentPage === index ? "bg-brand-blue" : "bg-[#d6d6d6] hover:bg-[#b8b8b8]"}`}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
