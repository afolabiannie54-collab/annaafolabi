import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Page not found | Anna Afolabi",
};

export default function NotFound() {
  return (
    <main className="relative bg-background min-h-[85vh] px-6 md:px-12 pt-32 pb-20 flex flex-col items-center justify-center text-center overflow-hidden">
      <div className="flex items-center justify-center gap-1 md:gap-4 font-inter font-extrabold text-black tracking-tighter leading-none text-[8rem] sm:text-[11rem] md:text-[18rem]">
        <span className="animate-hero-fade">4</span>

        <div className="animate-hero-fade [animation-delay:150ms]">
          <div className="animate-float relative w-[6.5rem] h-[6.5rem] sm:w-36 sm:h-36 md:w-72 md:h-72 group">
            <div
              className="absolute inset-0 rounded-full bg-[#D4908A]/30 blur-3xl scale-125"
              aria-hidden="true"
            />
            <Image
              src="/avatar.png"
              alt="Anna's avatar, standing in for the zero"
              width={288}
              height={288}
              priority
              className="relative w-full h-full rounded-full grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:rotate-12 group-hover:scale-105"
            />
          </div>
        </div>

        <span className="animate-hero-fade [animation-delay:300ms]">4</span>
      </div>

      <h1 className="animate-hero-fade [animation-delay:450ms] font-inter text-2xl md:text-4xl font-extrabold text-black tracking-tight mt-8 md:mt-10">
        This page took a wrong turn.
      </h1>
      <p className="animate-hero-fade [animation-delay:550ms] font-inter text-base md:text-lg text-muted mt-3 max-w-md">
        It doesn&apos;t exist, or it moved somewhere I forgot to tell you about.
      </p>

      <div className="animate-hero-fade [animation-delay:700ms] mt-8 md:mt-10">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 px-7 py-4 rounded-full bg-black text-white font-inter font-semibold border-2 border-black hover:bg-white hover:text-black transition-all duration-200"
        >
          Take me home
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
      </div>
    </main>
  );
}
