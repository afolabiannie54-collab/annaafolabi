import Reveal from "./Reveal";
import ScribbleCircle from "./ScribbleCircle";
import HeroBlurOverlay from "./HeroBlurOverlay";

export default function Approach() {
  return (
    <section className="relative z-10 pt-0 md:pt-24 px-6 md:px-12">
      <HeroBlurOverlay />
      <div className="relative z-10 max-w-4xl mx-auto bg-white rounded-t-3xl px-6 md:px-16 py-16 md:py-24 text-center">
        <Reveal>
          <h2 className="font-playfair text-3xl md:text-5xl font-semibold text-black tracking-tighter leading-[1.15]">
            Your site should be doing{" "}
            <ScribbleCircle>more for you</ScribbleCircle>
          </h2>
        </Reveal>

        <Reveal delay={150} className="mt-8 md:mt-10 max-w-xl mx-auto">
          <p className="font-inter text-xl md:text-2xl font-bold text-black">
            A website shouldn&apos;t just exist.
          </p>
          <p className="font-inter text-base md:text-lg text-muted mt-3">
            Your website is where potential customers decide if you&apos;re
            worth their time. It should look good, make your business easier
            to choose, and do some of the work for you.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
