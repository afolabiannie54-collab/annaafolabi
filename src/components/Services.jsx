"use client";

import { useState } from "react";
import Link from "next/link";
import Reveal from "./Reveal";

const services = [
  {
    title: "Websites & Web Apps",
    description:
      "Websites, e-commerce stores, and custom web applications built around how your business actually works.",
  },
  {
    title: "Automation & Integrations",
    description:
      "Connect the tools you already use and automate repetitive work, from customer flows to internal processes.",
  },
  {
    title: "Business Systems",
    description:
      "Custom digital tools that help you manage, sell, serve, or operate more efficiently.",
  },
];

export default function Services() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="services" className="relative z-10 scroll-mt-16 bg-background px-6 md:px-12 py-16 md:py-24">
      <Reveal>
        <h2 className="font-inter text-4xl md:text-6xl font-extrabold text-black tracking-tighter text-right mb-10 md:mb-14">
          /Services
        </h2>
      </Reveal>

      <div className="flex flex-col border-t border-black/10">
        {services.map((service, i) => {
          const isOpen = openIndex === i;
          return (
            <Reveal key={service.title} delay={i * 150} className="border-b border-black/10">
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? -1 : i)}
                className="w-full flex items-center justify-between gap-6 py-8 md:py-10 text-left cursor-pointer"
              >
                <span className="font-inter text-3xl md:text-5xl font-extrabold text-black tracking-tight">
                  {service.title}
                </span>
                <svg
                  className={`w-7 h-7 md:w-9 md:h-9 shrink-0 transition-transform duration-300 ease-out ${
                    isOpen ? "rotate-45" : ""
                  }`}
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M12 5v14M5 12h14"
                    stroke="black"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>

              <div
                className={`grid transition-all duration-300 ease-out ${
                  isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="font-inter text-base md:text-lg text-muted max-w-xl pb-8 md:pb-10">
                    {service.description}
                  </p>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>

      <Reveal delay={services.length * 150}>
        <p className="font-inter text-sm text-muted mt-10">
          Need something specific?{" "}
          <Link
            href="/start"
            className="text-black font-semibold underline underline-offset-4 hover:no-underline"
          >
            Let&apos;s talk →
          </Link>
        </p>
      </Reveal>
    </section>
  );
}
