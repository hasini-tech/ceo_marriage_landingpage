import { motion } from "framer-motion";

import ringImage from "@/assets/ring.png";
import { COUPLE } from "@/config/love";
import { SectionHeading } from "./SectionHeading";

export function Engagement() {
  return (
    <section id="engagement" className="relative mx-auto max-w-5xl px-5 py-28 text-center">
      <SectionHeading kicker="The Promise" title="We're Engaged! 💍" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1 }}
        className="relative mx-auto w-full max-w-xl overflow-hidden rounded-[1.5rem] border border-white/15 shadow-[0_24px_90px_oklch(0.12_0.04_155/0.5)]"
      >
        <img
          src={ringImage}
          alt="A couple wearing engagement rings and holding hands"
          width={1600}
          height={1200}
          className="h-[260px] w-full object-cover sm:h-[340px]"
        />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,oklch(0.1_0.03_155/0.42))]" />
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.8 }}
        className="font-display mx-auto mt-8 max-w-xl text-xl leading-relaxed font-light text-foreground/85 italic sm:text-2xl"
      >
        "Two souls, one promise, and a lifetime of love ahead."
      </motion.p>

      <p className="mt-4 text-xs tracking-[0.35em] text-accent uppercase">{COUPLE.venue}</p>
    </section>
  );
}

export default Engagement;
