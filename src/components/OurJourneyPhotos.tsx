import { motion } from "framer-motion";

import earlyMemory from "@/assets/childhood.png";
import recentMemory from "@/assets/moment.png";

type JourneyCardProps = {
  label: string;
  image: string;
  alt: string;
  position?: string;
  delay: number;
};

function JourneyCard({ label, image, alt, position = "center", delay }: JourneyCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
      className="journey-card"
    >
      <div className="journey-card__heading">
        <h3>{label}</h3>
      </div>

      <div className="journey-frame">
        <img
          src={image}
          alt={alt}
          width={1024}
          height={1536}
          loading="lazy"
          decoding="async"
          style={{ objectPosition: position }}
        />
        <span className="journey-frame__heart" aria-hidden="true">
          ♥
        </span>
      </div>
    </motion.article>
  );
}

export function OurJourneyPhotos() {
  return (
    <section id="journey-photos" aria-labelledby="journey-photos-title" className="journey-section">
      <div className="journey-section__content">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="journey-intro"
        >
          <div className="journey-intro__rule" aria-hidden="true">
            <span />
            <b>♥</b>
            <span />
          </div>
        </motion.div>

        <div className="journey-grid">
          <JourneyCard
            label="Childhood"
            image={earlyMemory}
            alt="An illustrated memory from the beginning of their story"
            position="center"
            delay={0.05}
          />
          <JourneyCard
            label="Recent"
            image={recentMemory}
            alt="Sreekarrthikeyan and Prashantini together"
            position="center 24%"
            delay={0.18}
          />
        </div>
      </div>
    </section>
  );
}

export default OurJourneyPhotos;
