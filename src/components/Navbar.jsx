"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { label: "Home", href: "/" },
    { label: "Work", href: "/#work" },
    { label: "Services", href: "/#services" },
    { label: "Socials", href: "/socials" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 px-6 md:px-12 flex items-center justify-between bg-white border-b border-black/10">
      {/* Logo */}
      <Link href="/" className="font-playfair text-2xl font-bold italic text-black/80 tracking-tighter">
        Anna Afolabi
      </Link>

      {/* Desktop links */}
      <ul className="hidden md:flex items-center gap-10">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="font-inter text-[1.05rem] font-bold text-black hover:text-black/50 transition-colors duration-300 ease-out"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Link
        href="/start"
        className="group hidden md:inline-flex items-center gap-2 px-5 py-2 rounded-full bg-black text-sm font-inter font-semibold text-white hover:bg-white hover:text-black border-2 border-black transition-all duration-200"
      >
        Start a Project
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        >
          <path d="M3 11L11 3M11 3H4.5M11 3V9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>

      {/* Mobile hamburger */}
      <button
        type="button"
        className="md:hidden relative flex min-w-11 min-h-11 flex-col items-center justify-center gap-1.5 cursor-pointer touch-manipulation z-50"
        onClick={() => setMenuOpen((open) => !open)}
        aria-label="Toggle menu"
      >
        <span className={`block w-6 h-0.5 bg-black transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
        <span className={`block w-6 h-0.5 bg-black transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
        <span className={`block w-6 h-0.5 bg-black transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
      </button>

      {/* Backdrop */}
      <div
        className={`fixed top-16 left-0 right-0 bottom-0 z-40 bg-black/30 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile menu */}
      <div
        className={`absolute top-full left-0 right-0 z-50 bg-white border-t border-black/10 px-6 py-4 flex flex-col md:hidden origin-top transition-all duration-300 ease-out ${
          menuOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-3 pointer-events-none"
        }`}
      >
        {menuOpen &&
          links.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              style={{ animationDelay: `${i * 60}ms` }}
              className="opacity-0 animate-[fade-down_0.4s_ease-out_both] font-inter text-3xl font-bold tracking-tight text-black py-4 border-b border-black/10"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        {menuOpen && (
          <Link
            href="/start"
            style={{ animationDelay: `${links.length * 60}ms` }}
            className="opacity-0 animate-[fade-down_0.4s_ease-out_both] mt-6 mb-2 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-black text-sm font-inter font-semibold text-white"
            onClick={() => setMenuOpen(false)}
          >
            Start a Project
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 11L11 3M11 3H4.5M11 3V9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        )}
      </div>
    </nav>
  );
}