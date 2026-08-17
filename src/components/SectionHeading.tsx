import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function SectionHeading({ kicker, title }: { kicker?: string; title: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.8 }}
      className="mb-14 text-center"
    >
      {kicker && <p className="mb-4 text-xs tracking-[0.45em] text-accent uppercase">{kicker}</p>}
      <h2 className="font-display text-glow text-3xl font-light text-balance sm:text-5xl">{title}</h2>
      <span className="mx-auto mt-6 block h-px w-24 bg-[linear-gradient(90deg,transparent,var(--color-accent),transparent)]" />
    </motion.div>
  );
}

export default SectionHeading;