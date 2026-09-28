"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export default function AboutAvatar() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const section = el.closest("section");
    if (!section) return;

    let raf = 0;
    const reset = () => {
      cancelAnimationFrame(raf);
      el.style.setProperty("--tx", "0px");
      el.style.setProperty("--ty", "0px");
      el.style.setProperty("--rot", "0deg");
    };
    const onMove = (e) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const dx = (e.clientX - (rect.left + rect.width / 2)) / window.innerWidth;
        const dy = (e.clientY - (rect.top + rect.height / 2)) / window.innerHeight;
        el.style.setProperty("--tx", `${dx * 28}px`);
        el.style.setProperty("--ty", `${dy * 28}px`);
        el.style.setProperty("--rot", `${dx * 16}deg`);
      });
    };

    section.addEventListener("mousemove", onMove, { passive: true });
    section.addEventListener("mouseleave", reset);
    return () => {
      section.removeEventListener("mousemove", onMove);
      section.removeEventListener("mouseleave", reset);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="animate-float">
      <div
        ref={ref}
        className="relative w-24 h-24 md:w-28 md:h-28 transition-transform duration-300 ease-out"
        style={{
          transform: "translate(var(--tx, 0px), var(--ty, 0px)) rotate(var(--rot, 0deg))",
        }}
      >
        <div
          className="absolute inset-0 rounded-full bg-[#D4908A]/30 blur-2xl scale-150"
          aria-hidden="true"
        />
        <Image
          src="/avatar.png"
          alt="Anna"
          width={112}
          height={112}
          className="relative rounded-full grayscale transition-[filter] duration-500 hover:grayscale-0"
        />
      </div>
    </div>
  );
}
