"use client";

import { useEffect, useRef, useState } from "react";

export default function ScribbleCircle({ children }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.6 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <span ref={ref} className="relative inline-block px-1">
      <svg
        className="absolute -inset-x-3 -inset-y-2 md:-inset-x-4 md:-inset-y-3 w-[calc(100%+1.5rem)] h-[calc(100%+1rem)] md:w-[calc(100%+2rem)] md:h-[calc(100%+1.5rem)] pointer-events-none overflow-visible"
        viewBox="0 0 220 90"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          d="M18 45 C15 20, 45 8, 110 7 C175 6, 208 18, 205 45 C208 74, 172 85, 110 84 C46 83, 15 72, 18 45 Z"
          stroke="#D4908A"
          strokeWidth="3"
          strokeLinecap="round"
          pathLength="1"
          style={{
            strokeDasharray: 1,
            strokeDashoffset: visible ? 0 : 1,
            transition: "stroke-dashoffset 1.1s cubic-bezier(0.65,0,0.35,1) 0.3s",
          }}
        />
      </svg>
      <span className="relative z-10">{children}</span>
    </span>
  );
}
