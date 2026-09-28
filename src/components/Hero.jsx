import Link from "next/link";
import HeroPhoto from "./HeroPhoto";

export default function Hero() {
  return (
    <section className="relative z-0 sticky top-0 md:h-screen overflow-hidden px-6 md:px-12 pt-24 md:pt-28 flex flex-col items-center text-center">
      <h1 className="animate-hero-reveal font-playfair text-5xl md:text-7xl lg:text-8xl font-semibold text-black tracking-tighter leading-[1.05] pb-2 md:pb-3 max-w-5xl">
        Sites and Systems that
        <br className="hidden md:block" />
        <span className="md:hidden"> </span>
        run your business for you
      </h1>

      <p className="animate-hero-fade [animation-delay:500ms] font-inter text-base md:text-lg text-muted mt-6 md:mt-0 md:absolute md:left-16 lg:left-25 md:bottom-60 md:text-left max-w-xs z-10">
        Websites and automated systems to sell, serve, and save you time.
      </p>

      <div className="animate-hero-fade [animation-delay:950ms] flex items-center justify-center gap-4 mt-6 md:mt-0 md:justify-start md:gap-6 md:absolute md:right-6 lg:right-12 md:bottom-10 z-10">
        <Link
          href="/start"
          className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-black text-white font-inter font-semibold hover:bg-white hover:text-black border-2 border-black transition-all duration-200"
        >
          Start a Project
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
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

        <Link
          href="/#work"
          className="font-inter font-semibold text-black/70 hover:text-black transition-colors duration-200"
        >
          See my work
        </Link>
      </div>

      <div className="group relative w-full max-w-sm mt-2 md:mt-0 md:max-w-none md:absolute md:left-1/2 md:-translate-x-1/2 md:bottom-0 md:w-auto md:h-[66%] z-10">
        <div className="animate-hero-fade [animation-delay:750ms] relative w-full h-full">
          <div className="hidden md:block absolute inset-8 rounded-[50%] bg-[#D4908A]/25 blur-3xl opacity-0 scale-90 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:scale-100" />
          <HeroPhoto />
        </div>
      </div>

      <div
        className="md:hidden absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-[#F6F3EF] pointer-events-none z-20"
        aria-hidden="true"
      />
    </section>
  );
}
