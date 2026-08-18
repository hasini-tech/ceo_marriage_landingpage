import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import { EVENT_DATE, EVENT_DATE_LABEL } from "@/config/love";
import { SectionHeading } from "./SectionHeading";

function remaining(target: Date) {
  const diff = Math.max(0, target.getTime() - Date.now());
  return {
    Days: Math.floor(diff / 86_400_000),
    Hours: Math.floor(diff / 3_600_000) % 24,
    Minutes: Math.floor(diff / 60_000) % 60,
    Seconds: Math.floor(diff / 1000) % 60,
  };
}

export function Countdown() {
  // Start at zeros so SSR and first client render agree, then tick.
  const [time, setTime] = useState({ Days: 0, Hours: 0, Minutes: 0, Seconds: 0 });

  useEffect(() => {
    setTime(remaining(EVENT_DATE));
    const id = setInterval(() => setTime(remaining(EVENT_DATE)), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="countdown" className="relative mx-auto max-w-4xl px-5 py-28 text-center">
      <SectionHeading kicker="Save The Date" title="Counting Down To Forever" />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
        {Object.entries(time).map(([label, value], i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            whileHover={{ y: -6 }}
            className="glass-pink rounded-3xl px-4 py-8"
          >
            <span className="font-display text-readable text-glow block text-4xl leading-none font-medium text-foreground tabular-nums sm:text-6xl">
              {String(value).padStart(2, "0")}
            </span>
            <span className="text-readable mt-3 block text-[0.65rem] font-semibold tracking-[0.35em] text-foreground uppercase">
              {label}
            </span>
          </motion.div>
        ))}
      </div>

      <p className="text-readable mt-8 text-sm font-medium text-foreground">{EVENT_DATE_LABEL}</p>
    </section>
  );
}

export default Countdown;
