import { motion } from "framer-motion";
import couple from "@/assets/couple.png";
import { COUPLE, HERO } from "@/config/love";

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] flex-col items-center justify-end overflow-hidden px-5 pt-28 pb-16 text-center"
    >
      <motion.img
        src={couple}
        alt="A romantic couple in traditional attire standing in the temple entrance"
        width={1024}
        height={1280}
        initial={{ opacity: 0, scale: 1.06, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.6, ease: "easeOut" }}
        className="pointer-events-none absolute bottom-0 left-1/2 h-[70svh] w-auto -translate-x-1/2 object-contain drop-shadow-[0_0_80px_oklch(0.57_0.15_152/0.55)] md:h-[82svh]"
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-[linear-gradient(180deg,transparent,oklch(0.1_0.03_155/0.85))]" />

      <motion.div
        initial="hidden"
        animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.18, delayChildren: 0.4 } } }}
        className="relative z-10 max-w-3xl"
      >
        <motion.p
          variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
          className="mb-5 text-xs tracking-[0.45em] text-accent uppercase"
        >
          {COUPLE.names}
        </motion.p>

        <motion.h1
          variants={{ hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.9 }}
          className="font-display text-glow text-4xl leading-[1.1] font-light text-balance sm:text-6xl md:text-7xl"
        >
          {HERO.heading}
        </motion.h1>

        <motion.p
          variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
          className="mx-auto mt-6 max-w-md text-base font-light text-foreground/75 sm:text-lg"
        >
          {HERO.subheading}
        </motion.p>

        <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }} className="mt-10">
          <motion.a
            href="#story"
            whileHover={{ scale: 1.05, rotateX: -8, rotateY: 6 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300, damping: 18 }}
            style={{ transformStyle: "preserve-3d", perspective: 600 }}
            className="glow-emerald inline-flex items-center gap-3 rounded-full bg-primary px-9 py-4 text-sm font-medium tracking-[0.18em] text-primary-foreground uppercase"
          >
            {HERO.cta}
            <span aria-hidden>→</span>
          </motion.a>
        </motion.div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-10 mt-12 h-10 w-[1px] bg-[linear-gradient(180deg,var(--color-accent),transparent)]"
      />
    </section>
  );
}

export default Hero;