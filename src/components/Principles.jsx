"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";

const principles = [
  {
    title: "Make a strong impression.",
    description:
      "Reflect the quality of your business and give potential customers a reason to keep looking.",
  },
  {
    title: "Serve your customers.",
    description:
      "Answer questions, handle inquiries, and make it easier for customers to get what they need.",
  },
  {
    title: "Make the business work better.",
    description:
      "Turn things that once required manual effort into simple digital experiences.",
  },
];

export default function Principles() {
  const [active, setActive] = useState(0);
  const headingRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  useEffect(() => {
    const heading = headingRef.current;
    const left = leftRef.current;
    const right = rightRef.current;
    if (!heading || !left || !right) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      const rect = heading.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (vh - rect.top) / (vh * 0.65)));
      const eased = 1 - Math.pow(1 - p, 3);
      const gap = parseFloat(getComputedStyle(heading).fontSize) * 0.3;
      const free = Math.max(
        0,
        heading.clientWidth - left.offsetWidth - right.offsetWidth - gap
      );
      const shift = (free / 2) * (1 - eased);
      left.style.transform = `translateX(${-shift}px)`;
      right.style.transform = `translateX(${shift}px)`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="relative z-10 bg-black px-6 md:px-12 py-20 md:py-28">
      <Reveal>
        <h2
          ref={headingRef}
          className="flex flex-wrap justify-center gap-x-[0.3em] font-inter text-4xl md:text-6xl font-extrabold text-white tracking-tighter leading-[1.1] mb-10 md:mb-14"
        >
          <span ref={leftRef} className="will-change-transform">
            What &ldquo;more&rdquo;
          </span>
          <span ref={rightRef} className="will-change-transform">
            actually means.
          </span>
        </h2>
      </Reveal>

      <div className="grid md:grid-cols-[6fr_5fr] gap-8 md:gap-14 items-center">
        <Reveal delay={100} className="order-2 md:order-1 flex flex-col gap-5 md:gap-7">
          {principles.map((principle, i) => (
            <button
              key={principle.title}
              type="button"
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              className={`text-left font-inter text-2xl md:text-4xl font-extrabold tracking-tight transition-colors duration-200 cursor-pointer ${
                active === i ? "text-white" : "text-white/30 hover:text-white/60"
              }`}
            >
              {principle.title}
            </button>
          ))}
        </Reveal>

        <Reveal
          delay={200}
          className="order-1 md:order-2 min-h-[9rem] md:min-h-[11rem] flex flex-col justify-center"
        >
          <p className="font-inter text-lg md:text-xl font-bold text-white mb-3">
            Your site should
          </p>
          <p
            key={active}
            className="animate-hero-fade font-inter text-xl md:text-3xl text-white/80 leading-snug"
          >
            {principles[active].description}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
