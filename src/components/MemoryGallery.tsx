import { motion } from "framer-motion";
import { useRef, useState, type CSSProperties, type MouseEvent } from "react";

import animation from "@/assets/animation.png";
import bike from "@/assets/piccam.png";
import coupleFriend from "@/assets/heardhand.png";
import heard from "@/assets/heard.png";
import heartHands from "@/assets/seflpic.png";
import hyperHead from "@/assets/delhi.png";
import lovelyPic from "@/assets/karrthiann.png";
import moment from "@/assets/moment.png";
import natural from "@/assets/natural.jpeg";
import picture from "@/assets/picture4.png";
import picture4 from "@/assets/picture.png";
import ring from "@/assets/say.jpeg";
import saveTheDate from "@/assets/lovelypic.png";
import say from "@/assets/say.jpeg";

type Memory = {
  src: string;
  caption: string;
  note: string;
  objectPosition: string;
  rotation: number;
  position: {
    top: number;
    left: number;
    width: number;
    height: number;
    z: number;
  };
};

const MEMORIES: Memory[] = [
  {
    src: animation,
    caption: "A bright beginning",
    note: "Where it all began",
    objectPosition: "center center",
    rotation: -2,
    position: { top: 3, left: 2, width: 10, height: 22, z: 2 },
  },
  {
    src: picture,
    caption: "Together",
    note: "Side by side",
    objectPosition: "center 22%",
    rotation: -1,
    position: { top: 3, left: 13, width: 19, height: 43, z: 4 },
  },
  {
    src: picture4,
    caption: "A quiet moment",
    note: "Just us two",
    objectPosition: "center 35%",
    rotation: 1,
    position: { top: 8, left: 29, width: 11, height: 23, z: 3 },
  },
  {
    src: heartHands,
    caption: "A heart made two",
    note: "One promise",
    objectPosition: "center 25%",
    rotation: 0,
    position: { top: 17, left: 48, width: 10, height: 16, z: 5 },
  },
  {
    src: natural,
    caption: "Our everyday joy",
    note: "The little things",
    objectPosition: "center center",
    rotation: 1,
    position: { top: 4, left: 60, width: 21, height: 25, z: 2 },
  },
  {
    src: saveTheDate,
    caption: "The day ahead",
    note: "A lifetime to come",
    objectPosition: "center center",
    rotation: 0,
    position: { top: 5, left: 82, width: 15, height: 18, z: 1 },
  },
  {
    src: hyperHead,
    caption: "Adventures together",
    note: "Everywhere with you",
    objectPosition: "center 56%",
    rotation: 0,
    position: { top: 52, left: 18, width: 17, height: 28, z: 3 },
  },
  {
    src: say,
    caption: "A conversation",
    note: "Always listening",
    objectPosition: "center center",
    rotation: -1,
    position: { top: 56, left: 36, width: 12, height: 17, z: 2 },
  },
  {
    src: coupleFriend,
    caption: "Forever close",
    note: "A lifetime together",
    objectPosition: "center 36%",
    rotation: 0,
    position: { top: 62, left: 49, width: 21, height: 27, z: 4 },
  },
  {
    src: lovelyPic,
    caption: "Held close",
    note: "Love in every frame",
    objectPosition: "center center",
    rotation: 1,
    position: { top: 51, left: 70, width: 12, height: 25, z: 3 },
  },
  {
    src: heard,
    caption: "A day to remember",
    note: "Surrounded by love",
    objectPosition: "center 38%",
    rotation: -1,
    position: { top: 76, left: 78, width: 10, height: 16, z: 5 },
  },
  {
    src: bike,
    caption: "The long ride",
    note: "Life is better together",
    objectPosition: "center 43%",
    rotation: 1,
    position: { top: 77, left: 3, width: 13, height: 17, z: 2 },
  },
  {
    src: moment,
    caption: "Little moments",
    note: "Big memories",
    objectPosition: "center 40%",
    rotation: -1,
    position: { top: 80, left: 31, width: 15, height: 14, z: 2 },
  },
  {
    src: ring,
    caption: "The ring",
    note: "A quiet yes",
    objectPosition: "center center",
    rotation: 0,
    position: { top: 80, left: 64, width: 12, height: 14, z: 4 },
  },
];

function EditorialPhoto({
  src,
  caption,
  note,
  objectPosition,
  rotation,
  position,
  index,
}: Memory & { index: number }) {
  const ref = useRef<HTMLElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const onMove = (event: MouseEvent<HTMLElement>) => {
    const element = ref.current;
    if (!element) return;

    const bounds = element.getBoundingClientRect();
    const px = (event.clientX - bounds.left) / bounds.width - 0.5;
    const py = (event.clientY - bounds.top) / bounds.height - 0.5;
    setTilt({ x: -py * 5, y: px * 7 });
  };

  const positionStyle = {
    "--photo-top": `${position.top}%`,
    "--photo-left": `${position.left}%`,
    "--photo-width": `${position.width}%`,
    "--photo-height": `${position.height}%`,
    "--photo-z": position.z,
  } as CSSProperties;

  return (
    <motion.figure
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      initial={{ opacity: 0, scale: 0.92 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.65, delay: Math.min(index * 0.035, 0.45), ease: "easeOut" }}
      animate={{
        rotate: rotation,
        rotateX: tilt.x,
        rotateY: tilt.y,
        scale: tilt.x || tilt.y ? 1.04 : 1,
      }}
      style={{ ...positionStyle, transformStyle: "preserve-3d", perspective: 900 }}
      className="editorial-photo group"
    >
      <img
        src={src}
        alt={caption}
        loading={index < 8 ? "eager" : "lazy"}
        width={1600}
        height={1000}
        style={{ objectPosition }}
        className="editorial-photo__image transition-transform duration-700 group-hover:scale-105"
      />
      <figcaption className="sr-only">
        {caption} — {note}
      </figcaption>
    </motion.figure>
  );
}

export function MemoryGallery() {
  return (
    <section id="memories" aria-labelledby="memories-title" className="editorial-gallery">
      <h2 id="memories-title" className="sr-only">
        Editorial memories
      </h2>

      <div className="editorial-collage" aria-label="Editorial collection of memories">
        <div className="editorial-copy">
          <p>Editorial photographs</p>
          <p>with a blend of</p>
          <p>emotion and style</p>
          <span>Based in love. Always.</span>
        </div>

        {MEMORIES.map((memory, index) => (
          <EditorialPhoto key={`${memory.caption}-${index}`} {...memory} index={index} />
        ))}
      </div>
    </section>
  );
}

export default MemoryGallery;
