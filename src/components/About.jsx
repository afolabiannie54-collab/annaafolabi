import Reveal from "./Reveal";
import WordReveal from "./WordReveal";
import AboutAvatar from "./AboutAvatar";

export default function About() {
  return (
    <section className="relative xl:sticky xl:top-0 xl:min-h-screen xl:flex xl:flex-col xl:justify-center z-10 bg-background px-6 md:px-12 py-16 md:py-24">
      <div className="w-full max-w-3xl mx-auto flex flex-col items-center text-center">
        <Reveal>
          <AboutAvatar />
        </Reveal>

        <Reveal delay={100} className="mt-8">
          <h2 className="font-inter text-4xl md:text-6xl font-extrabold text-black tracking-tighter">
            Hi, I&apos;m Anna.
          </h2>
        </Reveal>

        <WordReveal
          text="I think businesses should have thoughtful digital experiences, ones that make them easier to run and easier to choose."
          className="font-inter text-xl md:text-3xl font-semibold text-black/80 mt-6 leading-snug max-w-2xl"
          delay={200}
        />
      </div>

      <Reveal
        delay={400}
        className="mt-14 flex justify-center xl:mt-0 xl:absolute xl:right-6 2xl:right-20 xl:top-36"
      >
        <div className="relative w-full max-w-xs xl:w-80 rotate-3 hover:rotate-0 hover:-translate-y-1 transition-transform duration-300 ease-out">
          <div
            className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 -rotate-3 bg-white/70 shadow-sm"
            aria-hidden="true"
          />
          <div className="bg-[#F4CFCB] px-6 pt-8 pb-6 shadow-[0_18px_30px_-12px_rgba(0,0,0,0.3)]">
            <h3 className="font-hand text-3xl md:text-4xl font-bold text-black leading-none">
              Outside of client work
            </h3>
            <p className="font-inter text-base text-black/75 mt-3 leading-snug">
              I&apos;m currently interested in growing an online presence and
              helping content beginners take the right first steps with
              content.
            </p>
            <a
              href="https://www.instagram.com/annaafolabiharrison/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-5 px-4 py-2.5 rounded-full bg-black text-white font-inter text-sm font-semibold"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <rect
                  x="3"
                  y="3"
                  width="18"
                  height="18"
                  rx="5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
                <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
                <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
              </svg>
              Follow along on Instagram
              <svg
                width="12"
                height="12"
                viewBox="0 0 14 14"
                fill="none"
              >
                <path
                  d="M3 11L11 3M11 3H4.5M11 3V9.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
