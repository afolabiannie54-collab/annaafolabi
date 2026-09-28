import Link from "next/link";
import AboutAvatar from "@/components/AboutAvatar";

export const metadata = {
  title: "Socials | Anna Afolabi",
  description: "Find my website or send me a message on WhatsApp.",
};

const links = [
  {
    label: "Visit my website",
    description: "See everything I do",
    href: "/",
    primary: true,
  },
  {
    label: "Send me a message",
    description: "Write to me on WhatsApp",
    href: "https://wa.me/2349069136332?text=Hi%20Anna%2C%20I%20found%20you%20through%20Instagram.",
    external: true,
  },
];

const cardClass = (primary) =>
  `animate-hero-fade group flex items-center justify-between gap-4 rounded-2xl px-6 py-5 text-left transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_14px_24px_-10px_rgba(0,0,0,0.35)] ${
    primary ? "bg-black text-white" : "bg-white text-black border border-black/10"
  }`;

export default function SocialsPage() {
  return (
    <section className="relative bg-background min-h-[85vh] px-6 pt-28 pb-16 flex flex-col items-center overflow-hidden">
      <div className="w-full max-w-md flex flex-col items-center text-center">
        <div className="animate-hero-fade">
          <AboutAvatar />
        </div>

        <h1 className="animate-hero-fade [animation-delay:120ms] font-inter text-3xl md:text-4xl font-extrabold text-black tracking-tighter mt-8">
          Anna Afolabi
        </h1>
        <p className="animate-hero-fade [animation-delay:200ms] font-inter text-base text-muted mt-2 max-w-xs">
          Helping content beginners take the right first steps.
        </p>

        <div className="w-full flex flex-col gap-4 mt-10">
          {links.map((link, i) => {
            const inner = (
              <>
                <span>
                  <span className="block font-inter text-lg md:text-xl font-bold tracking-tight">
                    {link.label}
                  </span>
                  <span
                    className={`block font-inter text-sm mt-0.5 ${
                      link.primary ? "text-white/60" : "text-muted"
                    }`}
                  >
                    {link.description}
                  </span>
                </span>
                <svg
                  className="w-6 h-6 shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:-translate-y-1"
                  viewBox="0 0 14 14"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M3 11L11 3M11 3H4.5M11 3V9.5"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </>
            );
            const style = { animationDelay: `${300 + i * 120}ms` };

            return link.external ? (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                style={style}
                className={cardClass(link.primary)}
              >
                {inner}
              </a>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                style={style}
                className={cardClass(link.primary)}
              >
                {inner}
              </Link>
            );
          })}
        </div>

        <div
          style={{ animationDelay: `${300 + links.length * 120}ms` }}
          className="animate-hero-fade mt-10"
        >
          <a
            href="https://www.instagram.com/annaafolabiharrison/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="flex items-center justify-center w-12 h-12 rounded-full border border-black/20 text-black hover:bg-black hover:text-white transition-colors duration-200"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
              <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
              <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
