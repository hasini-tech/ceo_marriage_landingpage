import { motion } from "framer-motion";

import ringImage from "@/assets/savethedate.png";
import { COUPLE } from "@/config/love";
import { SectionHeading } from "./SectionHeading";

export function Engagement() {
  return (
    <section
      id="engagement"
      className="relative mx-auto w-full max-w-5xl scroll-mt-24 px-4 py-20 text-center sm:px-6 sm:py-28"
    >
      <SectionHeading kicker="The Promise" title="We're Engaged! 💍" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1 }}
        className="relative mx-auto w-full max-w-2xl overflow-hidden rounded-[1.25rem] border border-white/15 shadow-[0_24px_90px_oklch(0.12_0.04_350/0.5)] sm:rounded-[1.5rem]"
      >
        <div className="aspect-[16/9] w-full">
          <img
            src={ringImage}
            alt="Sreekarrthikeyan and Prashantini riding a motorcycle together"
            width={1672}
            height={941}
            loading="lazy"
            className="block h-full w-full object-cover object-center"
          />
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.8 }}
        className="font-display text-readable mx-auto mt-6 max-w-xl px-2 text-base leading-relaxed font-medium text-foreground italic sm:mt-8 sm:px-0 sm:text-2xl"
      >
        "Two souls, one promise, and a lifetime of love ahead."
      </motion.p>

      <p className="text-readable mt-4 px-2 text-[0.65rem] font-semibold tracking-[0.25em] text-foreground uppercase sm:px-0 sm:text-xs sm:tracking-[0.35em]">
        {COUPLE.venue}
      </p>
    </section>
  );
}

export default Engagement;
