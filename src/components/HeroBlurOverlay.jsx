"use client";

import { useEffect, useRef, useState } from "react";

export default function HeroBlurOverlay() {
  const ref = useRef(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let ticking = false;
    const check = () => {
      const rect = el.getBoundingClientRect();
      setActive(rect.top <= window.innerHeight * 0.6);
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(check);
        ticking = true;
      }
    };

    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div ref={ref} className="absolute top-0 left-0 w-full h-px" aria-hidden="true" />
      <div
        className={`fixed inset-0 z-[5] pointer-events-none transition-[backdrop-filter] duration-700 ease-out ${
          active ? "backdrop-blur-sm" : "backdrop-blur-none"
        }`}
        aria-hidden="true"
      />
    </>
  );
}
