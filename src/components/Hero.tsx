import { motion } from "framer-motion";

import lovelyPic from "@/assets/lovelypic.png";
import { COUPLE, HERO } from "@/config/love";

export function Hero() {
  return (
    <section
      id="home"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden px-3 pt-28 pb-12 sm:px-6 sm:pt-32 md:px-8 md:pb-16"
    >
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-12 lg:gap-20">
        <motion.div
          initial={{ opacity: 0, x: -32, scale: 0.97 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
          className="relative order-1 flex w-full items-center justify-center"
        >
          <div className="absolute h-[72%] w-[72%] rounded-full bg-[oklch(0.86_0.13_350/0.24)] blur-3xl" />
          <img
            src={lovelyPic}
            alt="A couple sharing a romantic moment"
            width={1536}
            height={1024}
            className="relative z-10 block aspect-[4/3] h-auto w-full max-w-2xl rounded-[1.5rem] object-cover object-center mix-blend-lighten drop-shadow-[0_0_70px_oklch(0.68_0.16_350/0.45)] sm:rounded-[2.5rem]"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 32, y: 16 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="relative z-20 order-2 mx-auto w-full max-w-xl p-2 text-center sm:p-6 md:mx-0 md:pl-8 md:text-left lg:pl-12"
        >
          <div className="pointer-events-none absolute inset-x-[-0.75rem] inset-y-[-1rem] -z-10 bg-[radial-gradient(ellipse_at_center,oklch(0.99_0.03_350/0.62)_0%,transparent_72%)]" />

          <p className="text-readable mb-4 text-xs font-semibold tracking-[0.28em] text-foreground uppercase sm:tracking-[0.45em]">
            {COUPLE.names}
          </p>

          <h1 className="font-display text-readable text-4xl leading-[1.05] font-medium text-foreground text-balance sm:text-6xl md:text-7xl">
            {HERO.heading}
          </h1>

          <p className="text-readable mx-auto mt-5 max-w-md text-sm font-medium leading-relaxed text-foreground sm:text-lg md:mx-0 md:mt-6">
            {HERO.subheading}
          </p>

          <div className="mt-8 sm:mt-10">
            <motion.a
              href="#story"
              whileHover={{ scale: 1.05, rotateX: -8, rotateY: 6 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
              style={{ transformStyle: "preserve-3d", perspective: 600 }}
              className="glow-pink inline-flex min-h-14 w-full items-center justify-center gap-2 whitespace-nowrap rounded-full bg-primary px-5 py-4 text-xs leading-none font-medium tracking-[0.12em] text-primary-foreground uppercase sm:w-auto sm:gap-3 sm:px-9 sm:text-sm sm:tracking-[0.18em]"
            >
              {HERO.cta}
              <span aria-hidden="true" className="shrink-0 text-base leading-none sm:text-lg">
                &rarr;
              </span>
            </motion.a>
          </div>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-5 left-1/2 hidden h-10 w-px -translate-x-1/2 bg-[linear-gradient(180deg,var(--color-accent),transparent)] md:block"
      />
    </section>
  );
}

export default Hero;
