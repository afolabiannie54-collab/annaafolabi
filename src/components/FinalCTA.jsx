import Link from "next/link";
import Reveal from "./Reveal";

export default function FinalCTA() {
  return (
    <section className="relative z-20 overflow-hidden bg-gradient-to-b from-neutral-600 to-neutral-900 px-6 md:px-12 py-16 md:py-20 flex flex-col items-center text-center">
      <div
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.18),transparent_65%)]"
        aria-hidden="true"
      />
      <Reveal className="relative">
        <h2 className="font-inter text-4xl md:text-6xl font-extrabold text-white tracking-tighter leading-[1.15] max-w-4xl">
          If your site isn&apos;t doing more,
          <br />
          it&apos;s time it did.
        </h2>
      </Reveal>

      <Reveal delay={200} className="relative mt-10 md:mt-12">
        <Link
          href="/start"
          className="group relative inline-flex items-center gap-2 md:gap-3 overflow-hidden px-5 py-3 md:px-12 md:py-7 rounded-full bg-white text-black font-inter text-sm sm:text-base md:text-2xl font-bold transition-transform duration-500 ease-out hover:scale-105 max-w-[90vw]"
        >
          <span
            className="absolute inset-0 bg-neutral-300 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"
            aria-hidden="true"
          />
          <span className="relative">Let&apos;s build a site that moves people</span>
          <svg
            viewBox="0 0 14 14"
            fill="none"
            className="relative w-4 h-4 md:w-[22px] md:h-[22px] shrink-0 transition-transform duration-500 ease-out group-hover:translate-x-1.5 group-hover:-translate-y-1.5 group-hover:rotate-12"
          >
            <path
              d="M3 11L11 3M11 3H4.5M11 3V9.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </Reveal>
    </section>
  );
}
