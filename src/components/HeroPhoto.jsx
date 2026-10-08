"use client";

import { useRef } from "react";
import Image from "next/image";

export default function HeroPhoto() {
  const maskRef = useRef(null);

  function handleMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    maskRef.current?.style.setProperty("--x", `${x}%`);
    maskRef.current?.style.setProperty("--y", `${y}%`);
  }

  function handleMouseLeave() {
    maskRef.current?.style.setProperty("--x", "-100%");
    maskRef.current?.style.setProperty("--y", "-100%");
  }

  return (
    <div
      className="relative w-full h-full"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Image
        src="/headshot.png"
        alt="Anna Afolabi"
        width={1195}
        height={896}
        className="relative w-full h-auto lg:w-auto lg:h-full object-contain lg:object-bottom grayscale-[90%]"
        priority
      />
      <div
        ref={maskRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          "--x": "-100%",
          "--y": "-100%",
          WebkitMaskImage:
            "radial-gradient(140px at var(--x) var(--y), black 0%, black 45%, transparent 100%)",
          maskImage:
            "radial-gradient(140px at var(--x) var(--y), black 0%, black 45%, transparent 100%)",
        }}
      >
        <Image
          src="/headshot.png"
          alt=""
          width={1195}
          height={896}
          aria-hidden="true"
          className="w-full h-auto lg:w-auto lg:h-full object-contain lg:object-bottom"
        />
      </div>
    </div>
  );
}
