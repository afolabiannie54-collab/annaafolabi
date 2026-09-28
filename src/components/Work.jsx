import Image from "next/image";
import Reveal from "./Reveal";

const projects = [
  {
    number: "01",
    title: "Ewa",
    tag: "Web Design — E-commerce, AI & Admin System",
    href: "https://ewa-store.vercel.app/",
    image: "/work/ewa/mockup.png",
    pills: ["Web Development", "E-commerce", "AI Integration", "Admin System", "Full Stack"],
  },
  {
    number: "02",
    title: "Chargeium",
    tag: "Web Design — E-commerce (Frontend)",
    href: "https://chargeium.vercel.app/",
    image: "/work/chargeium/mockup.png",
    pills: ["Web Development", "E-commerce", "Frontend"],
  },
];

export default function Work() {
  return (
    <section id="work" className="relative z-10 scroll-mt-16 bg-black px-6 md:px-12 py-16 md:py-20">
      <Reveal className="mb-10 md:mb-14">
        <h2 className="font-inter text-4xl md:text-6xl font-extrabold text-white tracking-tighter">
          /Selected Work
        </h2>
      </Reveal>

      <div className="grid md:grid-cols-2 gap-x-8 gap-y-10 md:gap-y-0">
        {projects.map((project, i) => (
          <Reveal
            key={project.number}
            delay={i * 350}
            className={i === 1 ? "md:mt-12" : ""}
          >
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group block rounded-2xl overflow-hidden bg-white"
          >
            <div className="relative aspect-[4/3] bg-black/5">
              {project.image && (
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover object-top"
                />
              )}
              <span className="absolute top-5 left-5 font-inter text-sm font-bold text-white/70 bg-black/40 rounded-full px-2 py-0.5">
                {project.number}
              </span>
              <svg
                className="absolute bottom-5 right-5 w-8 h-8 p-2 rounded-full bg-white transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:-translate-y-1"
                viewBox="0 0 14 14"
                fill="none"
              >
                <path
                  d="M3 11L11 3M11 3H4.5M11 3V9.5"
                  stroke="black"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div className={`p-6 ${i === 1 ? "md:text-right" : ""}`}>
              <h3 className="font-inter text-2xl md:text-3xl font-extrabold text-black tracking-tight">
                {project.title}
              </h3>
              <div className={`flex flex-wrap gap-2 mt-4 ${i === 1 ? "md:justify-end" : ""}`}>
                {project.pills.map((pill) => (
                  <span
                    key={pill}
                    className="font-inter text-xs font-semibold text-black border border-black/15 rounded-full px-3 py-1"
                  >
                    {pill}
                  </span>
                ))}
              </div>
            </div>
          </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
