"use client";

import { usePathname } from "next/navigation";

export default function FooterGate({ children }) {
  const pathname = usePathname();
  if (pathname === "/" || pathname === "/socials") return null;
  return children;
}
