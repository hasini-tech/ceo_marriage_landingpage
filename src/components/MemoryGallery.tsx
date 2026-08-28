import { motion } from "framer-motion";
import { useRef, useState } from "react";

import picture from "@/assets/picture.png";
import picture3 from "@/assets/picture3.png";
import picture4 from "@/assets/picture4.png";
import mem2 from "@/assets/mem-2.jpg";
import mem3 from "@/assets/mem-3.jpg";
import { SectionHeading } from "./SectionHeading";

/** Swap these for your own photos — same shape, nothing else to change. */
type Memory = {
  src: string;
  mobileSrc?: string;
  caption: string;
  note: string;
  objectPosition: string;
};

const MEMORIES: Memory[] = [
  {
    src: picture3,
    mobileSrc: picture,
    caption: "The temple corridor",
    note: "Where it all began",
    objectPosition: "center 22%",
  },
  { src: mem2, caption: "The ring", note: "A quiet yes", objectPosition: "center 48%" },
  { src: mem3, caption: "Jasmine & lights", note: "Our celebration", objectPosition: "center 50%" },
  { src: picture4, caption: "Us, together", note: "Everyday joy", objectPosition: "center 50%" },
];

function TiltCard({
  src,
  mobileSrc,
  caption,
  note,
  objectPosition,
  index,
}: Memory & { index: number }) {
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
      className="glass-pink group relative min-w-0 overflow-hidden rounded-3xl p-3"
    >
      <div className="aspect-[4/5] overflow-hidden rounded-2xl">
        <picture className="block h-full w-full">
          {mobileSrc && <source media="(max-width: 767px)" srcSet={mobileSrc} />}
          <img
            src={src}
            alt={caption}
            loading="lazy"
            width={900}
            height={1100}
            sizes="(max-width: 639px) calc(100vw - 2.5rem), (max-width: 1023px) calc(50vw - 2rem), 25vw"
            style={{ objectPosition }}
            className="block h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </picture>
      </div>
      <div
        className="flex items-baseline justify-between px-2 pt-4 pb-2"
        style={{ transform: "translateZ(40px)" }}
      >
        <span className="font-display text-readable text-lg font-medium text-foreground">
          {caption}
        </span>
        <span className="text-readable text-[0.65rem] font-semibold tracking-[0.25em] text-foreground uppercase">
          {note}
        </span>
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
