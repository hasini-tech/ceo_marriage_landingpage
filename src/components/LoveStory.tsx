import { motion } from "framer-motion";
import { STORY } from "@/config/love";
import { SectionHeading } from "./SectionHeading";

export function LoveStory() {
  return (
    <section id="story" className="relative mx-auto max-w-5xl px-5 py-28">
      <SectionHeading kicker="Our Journey" title="A Love Story Written Slowly" />

      <div className="relative">
        <span className="absolute top-0 left-4 h-full w-px bg-[linear-gradient(180deg,transparent,var(--color-accent),transparent)] md:left-1/2" />

        <ul className="space-y-12">
          {STORY.map((step, i) => (
            <li key={step.title} className="relative md:grid md:grid-cols-2 md:gap-12">
              <motion.span
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.5 }}
                className="absolute top-8 left-4 z-10 h-3 w-3 -translate-x-1/2 rounded-full bg-accent shadow-[0_0_20px_6px_oklch(0.72_0.17_152/0.5)] md:left-1/2"
              />

              <motion.article
                initial={{ opacity: 0, y: 40, x: i % 2 ? 30 : -30 }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`glass ml-12 rounded-3xl p-7 md:ml-0 ${
                  i % 2 ? "md:col-start-2" : "md:col-start-1 md:text-right"
                }`}
              >
                <p className="text-xs tracking-[0.3em] text-accent uppercase">{step.date}</p>
                <h3 className="font-display mt-2 text-2xl font-light">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed font-light text-foreground/75">{step.text}</p>
              </motion.article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default LoveStory;