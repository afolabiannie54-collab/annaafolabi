import Link from "next/link";

const links = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/#work" },
  { label: "Services", href: "/#services" },
  { label: "Socials", href: "/socials" },
];

export default function Footer() {
  return (
    <footer className="relative z-20 bg-neutral-900 text-white px-6 md:px-12 pt-16 md:pt-24 pb-8">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-12">
        <nav
          aria-label="Footer"
          className="flex flex-col w-full md:w-96 border-t border-white/10"
        >
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="group flex items-center justify-between py-4 border-b border-white/10"
            >
              <span className="font-inter text-2xl md:text-3xl font-bold tracking-tight text-white/70 group-hover:text-white group-hover:translate-x-2 transition-all duration-300 ease-out">
                {link.label}
              </span>
              <svg
                className="w-6 h-6 shrink-0 text-white opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300 ease-out"
                viewBox="0 0 14 14"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M3 11L11 3M11 3H4.5M11 3V9.5"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <a
            href="https://www.instagram.com/annaafolabiharrison/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="flex items-center justify-center w-12 h-12 rounded-full border border-white/25 text-white hover:bg-white hover:text-black transition-colors duration-200"
          >
            <svg
              width="20"
              height="20"
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
          </a>

          <Link
            href="/start"
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-inter font-semibold hover:bg-neutral-300 transition-colors duration-200"
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
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-14 md:mt-20 pt-6 border-t border-white/10">
        <p className="font-mono text-sm text-white/60">
          Copyright &copy; {new Date().getFullYear()} Anna Afolabi, all rights
          reserved.
        </p>
        <a
          href="#"
          className="group inline-flex items-center gap-1.5 font-mono text-sm text-white/70 hover:text-white transition-colors duration-200"
        >
          Back to top
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            className="transition-transform duration-200 group-hover:-translate-y-0.5"
          >
            <path
              d="M7 12V2M7 2L3 6M7 2L11 6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>
    </footer>
  );
}
