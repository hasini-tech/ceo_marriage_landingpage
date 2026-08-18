import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";
import { COUPLE, NAV_LINKS } from "@/config/love";

export function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 40));

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "glass-pink py-3 shadow-[0_8px_30px_oklch(0.35_0.08_350/0.12)]" : "glass-pink py-4"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5">
        <a href="#home" className="font-display text-2xl tracking-wide text-foreground">
          {COUPLE.logo}
          <span className="ml-2 inline-block h-1.5 w-1.5 rounded-full bg-accent align-middle shadow-[0_0_12px_var(--color-accent)]" />
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="group relative text-sm font-light tracking-widest text-foreground/80 uppercase transition-colors hover:text-foreground"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        <button
          aria-label="Toggle navigation"
          onClick={() => setOpen((o) => !o)}
          className="glass-pink flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full md:hidden"
        >
          <span className="block h-px w-4 bg-foreground" />
          <span className="block h-px w-4 bg-foreground" />
        </button>
      </nav>

      {open && (
        <motion.ul
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="mx-5 mt-3 flex flex-col gap-1 overflow-hidden rounded-2xl md:hidden glass"
        >
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="block px-5 py-3 text-sm tracking-widest text-foreground/85 uppercase"
              >
                {link.label}
              </a>
            </li>
          ))}
        </motion.ul>
      )}
    </motion.header>
  );
}

export default Navbar;
