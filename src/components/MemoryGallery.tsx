import { motion } from "framer-motion";
import { useRef, useState } from "react";

import mem1 from "@/assets/mem-1.jpg";
import mem2 from "@/assets/mem-2.jpg";
import mem3 from "@/assets/mem-3.jpg";
import mem4 from "@/assets/mem-4.jpg";
import { SectionHeading } from "./SectionHeading";

/** Swap these for your own photos — same shape, nothing else to change. */
const MEMORIES = [
  { src: mem1, caption: "The temple corridor", note: "Where it all began" },
  { src: mem2, caption: "The ring", note: "A quiet yes" },
  { src: mem3, caption: "Jasmine & lights", note: "Our celebration" },
  { src: mem4, caption: "Us, laughing", note: "Everyday joy" },
];

function TiltCard({ src, caption, note, index }: (typeof MEMORIES)[number] & { index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ x: -py * 14, y: px * 16 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      animate={{ rotateX: tilt.x, rotateY: tilt.y, scale: tilt.x || tilt.y ? 1.04 : 1 }}
      style={{ transformStyle: "preserve-3d", perspective: 900 }}
      className="glass-emerald group relative overflow-hidden rounded-3xl p-3"
    >
      <div className="overflow-hidden rounded-2xl">
        <img
          src={src}
          alt={caption}
          loading="lazy"
          width={900}
          height={1100}
          className="h-72 w-full object-cover transition-transform duration-700 group-hover:scale-110 sm:h-80"
        />
      </div>
      <div className="flex items-baseline justify-between px-2 pt-4 pb-2" style={{ transform: "translateZ(40px)" }}>
        <span className="font-display text-lg font-light">{caption}</span>
        <span className="text-[0.65rem] tracking-[0.25em] text-accent uppercase">{note}</span>
      </div>
    </motion.div>
  );
}

export function MemoryGallery() {
  return (
    <section id="memories" className="relative mx-auto max-w-6xl px-5 py-28">
      <SectionHeading kicker="Memories" title="Moments We Keep Close" />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {MEMORIES.map((m, i) => (
          <TiltCard key={m.caption} {...m} index={i} />
        ))}
      </div>
    </section>
  );
}

export default MemoryGallery;