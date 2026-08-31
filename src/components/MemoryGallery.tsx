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

type Position = {
  top: number;
  left: number;
  width: number;
  height: number;
  z?: number;
};

type Memory = {
  src: string;
  caption: string;
  note: string;
  objectPosition: string;
  rotation: number;
  /** Shared wall layout (percentages of .wall-gallery__wall). */
  position: Position & { z: number };
  /** Kept for the data shape used by the existing invitation content. */
  positionMobile: Position;
};

const MEMORIES: Memory[] = [
  {
    src: animation,
    caption: "A bright beginning",
    note: "Where it all began",
    objectPosition: "center center",
    rotation: -2,
    position: { top: 10, left: 27, width: 13, height: 16, z: 2 },
    positionMobile: { top: 2, left: 2, width: 26, height: 12 },
  },
  {
    src: picture,
    caption: "Together",
    note: "Side by side",
    objectPosition: "center 22%",
    rotation: -1,
    position: { top: 7, left: 40, width: 15, height: 24, z: 4 },
    positionMobile: { top: 1, left: 30, width: 40, height: 22 },
  },
  {
    src: picture4,
    caption: "A quiet moment",
    note: "Just us two",
    objectPosition: "center 35%",
    rotation: 1,
    position: { top: 9, left: 57, width: 8, height: 17, z: 3 },
    positionMobile: { top: 2, left: 72, width: 26, height: 15 },
  },
  {
    src: heartHands,
    caption: "A heart made two",
    note: "One promise",
    objectPosition: "center 25%",
    rotation: 0,
    position: { top: 14, left: 67, width: 9, height: 15, z: 5 },
    positionMobile: { top: 14, left: 2, width: 22, height: 9 },
  },
  {
    src: natural,
    caption: "Our everyday joy",
    note: "The little things",
    objectPosition: "center center",
    rotation: 1,
    position: { top: 35, left: 2, width: 11, height: 16, z: 2 },
    positionMobile: { top: 14, left: 60, width: 38, height: 16 },
  },
  {
    src: saveTheDate,
    caption: "The day ahead",
    note: "A lifetime to come",
    objectPosition: "center center",
    rotation: 0,
    position: { top: 32, left: 15, width: 15, height: 18, z: 1 },
    positionMobile: { top: 24, left: 25, width: 32, height: 13 },
  },
  {
    src: hyperHead,
    caption: "Adventures together",
    note: "Everywhere with you",
    objectPosition: "center 56%",
    rotation: 0,
    position: { top: 34, left: 31, width: 10, height: 19, z: 3 },
    positionMobile: { top: 48, left: 2, width: 44, height: 18 },
  },
  {
    src: say,
    caption: "A conversation",
    note: "Always listening",
    objectPosition: "center center",
    rotation: -1,
    position: { top: 32, left: 68, width: 10, height: 23, z: 2 },
    positionMobile: { top: 44, left: 48, width: 24, height: 12 },
  },
  {
    src: coupleFriend,
    caption: "Forever close",
    note: "A lifetime together",
    objectPosition: "center 36%",
    rotation: 0,
    position: { top: 33, left: 80, width: 14, height: 20, z: 4 },
    positionMobile: { top: 57, left: 48, width: 50, height: 16 },
  },
  {
    src: lovelyPic,
    caption: "Held close",
    note: "Love in every frame",
    objectPosition: "center center",
    rotation: 1,
    position: { top: 63, left: 2, width: 15, height: 18, z: 3 },
    positionMobile: { top: 68, left: 2, width: 44, height: 15 },
  },
  {
    src: heard,
    caption: "A day to remember",
    note: "Surrounded by love",
    objectPosition: "center 38%",
    rotation: -1,
    position: { top: 62, left: 20, width: 14, height: 17, z: 5 },
    positionMobile: { top: 76, left: 48, width: 24, height: 10 },
  },
  {
    src: bike,
    caption: "The long ride",
    note: "Life is better together",
    objectPosition: "center 43%",
    rotation: 1,
    position: { top: 61, left: 37, width: 15, height: 18, z: 2 },
    positionMobile: { top: 87, left: 2, width: 30, height: 11 },
  },
  {
    src: moment,
    caption: "Little moments",
    note: "Big memories",
    objectPosition: "center 40%",
    rotation: -1,
    position: { top: 63, left: 56, width: 14, height: 16, z: 2 },
    positionMobile: { top: 87, left: 34, width: 30, height: 11 },
  },
  {
    src: ring,
    caption: "The ring",
    note: "A quiet yes",
    objectPosition: "center center",
    rotation: 0,
    position: { top: 62, left: 74, width: 15, height: 18, z: 4 },
    positionMobile: { top: 87, left: 66, width: 30, height: 11 },
  },
];

function EditorialPhoto({
  src,
  caption,
  note,
  objectPosition,
  rotation,
  position,
  positionMobile,
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
    "--photo-top-m": `${positionMobile.top}%`,
    "--photo-left-m": `${positionMobile.left}%`,
    "--photo-width-m": `${positionMobile.width}%`,
    "--photo-height-m": `${positionMobile.height}%`,
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
      className="wall-photo group"
    >
      <img
        src={src}
        alt={caption}
        loading={index < 8 ? "eager" : "lazy"}
        width={1600}
        height={1000}
        style={{ objectPosition }}
        sizes="(max-width: 767px) 20vw, 13vw"
        className="wall-photo__image transition-transform duration-700 group-hover:scale-105"
      />
      <figcaption className="sr-only">
        {caption} — {note}
      </figcaption>
    </motion.figure>
  );
}

export function MemoryGallery() {
  return (
    <section id="memories" aria-labelledby="memories-title" className="wall-gallery">
      <h2 id="memories-title" className="sr-only">
        Editorial memories
      </h2>

      <div className="wall-gallery__wall" aria-label="Framed wall of memories">
        <div className="wall-gallery__copy">
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
