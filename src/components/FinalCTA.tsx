import { Canvas } from "@react-three/fiber";
import { motion } from "framer-motion";
import { Suspense } from "react";

import { FloatingHeart } from "./FloatingHeart";
import { LoveBubble } from "./LoveBubble";
import { Particles } from "./3d/Particles";
import { StudioEnv } from "./3d/StudioEnv";
import { COUPLE } from "@/config/love";
import { useIsCompact, useMounted, usePointerRef } from "@/hooks/usePointer";

export function FinalCTA() {
  const pointer = usePointerRef();
  const compact = useIsCompact();
  const mounted = useMounted();
  const hearts = compact ? 4 : 9;

  return (
    <section className="relative flex min-h-[90svh] items-center justify-center overflow-hidden px-5 py-28 text-center">
      {mounted && (
        <div className="pointer-events-none absolute inset-0">
          <Canvas
            camera={{ position: [0, 0, 8], fov: 50 }}
            dpr={compact ? 1 : [1, 1.8]}
            gl={{ antialias: !compact, alpha: true }}
          >
            <Suspense fallback={null}>
              <StudioEnv intensity={0.6} />
              <ambientLight intensity={0.9} />
              <directionalLight position={[3, 5, 5]} intensity={2} />
              <pointLight position={[-4, 0, 3]} intensity={40} color="#1B9D4A" distance={18} />
              {Array.from({ length: hearts }).map((_, i) => (
                <FloatingHeart
                  key={i}
                  pointer={pointer}
                  position={[((i % 4) - 1.5) * 3.6, ((i * 2.3) % 8) - 4, -4 - (i % 3) * 1.4]}
                  scale={0.26 + (i % 3) * 0.12}
                  speed={0.22 + (i % 3) * 0.1}
                  tint={i % 2 ? "emerald" : "ivory"}
                />
              ))}
              {!compact &&
                [0, 1, 2].map((i) => (
                  <LoveBubble
                    key={`b${i}`}
                    pointer={pointer}
                    position={[(i - 1) * 4.6, i - 1, -7]}
                    radius={0.42 + i * 0.16}
                    contains={i === 1 ? "flower" : "heart"}
                  />
                ))}
              <Particles count={compact ? 60 : 180} color="#7BE8A6" />
              <Particles count={compact ? 30 : 90} color="#FFFFFF" size={0.11} spread={14} />
            </Suspense>
          </Canvas>
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1 }}
        className="relative z-10 max-w-2xl"
      >
        <h2 className="font-display text-glow text-4xl leading-tight font-light text-balance sm:text-6xl">
          Forever Starts Here ❤️
        </h2>
        <p className="mx-auto mt-5 max-w-md text-base font-light text-foreground/75">
          Join us at {COUPLE.venue} as we begin the rest of our lives together.
        </p>
        <motion.a
          href="#countdown"
          whileHover={{ scale: 1.06, rotateX: -8, rotateY: 6 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 300, damping: 18 }}
          style={{ transformStyle: "preserve-3d", perspective: 600 }}
          className="glow-emerald mt-10 inline-flex rounded-full bg-primary px-10 py-4 text-sm font-medium tracking-[0.18em] text-primary-foreground uppercase"
        >
          Celebrate With Us
        </motion.a>

        <p className="mt-16 text-xs tracking-[0.4em] text-foreground/45 uppercase">
          {COUPLE.names} · With love
        </p>
      </motion.div>
    </section>
  );
}

export default FinalCTA;