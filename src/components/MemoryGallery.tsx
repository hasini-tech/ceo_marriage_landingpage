import { type CSSProperties } from "react";

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
};

const MEMORIES: Memory[] = [
  {
    src: animation,
    caption: "A bright beginning",
    note: "Where it all began",
    objectPosition: "center center",
    rotation: -2,
  },
  {
    src: picture,
    caption: "Together",
    note: "Side by side",
    objectPosition: "center 22%",
    rotation: -1,
  },
  {
    src: picture4,
    caption: "A quiet moment",
    note: "Just us two",
    objectPosition: "center 35%",
    rotation: 1,
  },
  {
    src: heartHands,
    caption: "A heart made two",
    note: "One promise",
    objectPosition: "center 25%",
    rotation: 0,
  },
  {
    src: natural,
    caption: "Our everyday joy",
    note: "The little things",
    objectPosition: "center center",
    rotation: 1,
  },
  {
    src: saveTheDate,
    caption: "The day ahead",
    note: "A lifetime to come",
    objectPosition: "center center",
    rotation: 0,
  },
  {
    src: hyperHead,
    caption: "Adventures together",
    note: "Everywhere with you",
    objectPosition: "center 56%",
    rotation: 0,
  },
  {
    src: say,
    caption: "A conversation",
    note: "Always listening",
    objectPosition: "center center",
    rotation: -1,
  },
  {
    src: coupleFriend,
    caption: "Forever close",
    note: "A lifetime together",
    objectPosition: "center 36%",
    rotation: 0,
  },
  {
    src: lovelyPic,
    caption: "Held close",
    note: "Love in every frame",
    objectPosition: "center center",
    rotation: 1,
  },
  {
    src: heard,
    caption: "A day to remember",
    note: "Surrounded by love",
    objectPosition: "center 38%",
    rotation: -1,
  },
  {
    src: bike,
    caption: "The long ride",
    note: "Life is better together",
    objectPosition: "center 43%",
    rotation: 1,
  },
  {
    src: moment,
    caption: "Little moments",
    note: "Big memories",
    objectPosition: "center 40%",
    rotation: -1,
  },
  {
    src: ring,
    caption: "The ring",
    note: "A quiet yes",
    objectPosition: "center center",
    rotation: 0,
  },
];

function CarouselGroup({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <div className="memory-carousel__group" aria-hidden={duplicate || undefined}>
      {MEMORIES.map((memory, index) => (
        <figure
          key={`${duplicate ? "duplicate-" : ""}${memory.caption}-${index}`}
          className="memory-carousel__photo"
          style={{ "--photo-rotation": `${memory.rotation}deg` } as CSSProperties}
        >
          <img
            src={memory.src}
            alt={duplicate ? "" : memory.caption}
            loading={index < 8 ? "eager" : "lazy"}
            width={1600}
            height={1000}
            style={{ objectPosition: memory.objectPosition }}
            sizes="(max-width: 767px) 18vw, 10vw"
            className="memory-carousel__image"
          />
          <figcaption className="sr-only">
            {memory.caption} {"\u2014"} {memory.note}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

export function MemoryGallery() {
  return (
    <section id="memories" aria-labelledby="memories-title" className="wall-gallery">
      <h2 id="memories-title" className="sr-only">
        Editorial memories
      </h2>

      <div className="memory-carousel">
        <div className="memory-carousel__copy">
          <p>Editorial photographs</p>
          <p>with a blend of</p>
          <p>emotion and style</p>
          <span>Based in love. Always.</span>
        </div>

        <div
          className="memory-carousel__viewport"
          role="region"
          aria-label="Auto-scrolling memories"
        >
          <div className="memory-carousel__track">
            <CarouselGroup />
            <CarouselGroup duplicate />
          </div>
        </div>
      </div>
    </section>
  );
}

export default MemoryGallery;
