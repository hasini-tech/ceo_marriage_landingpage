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
              <pointLight position={[-4, 0, 3]} intensity={40} color="#E88EAA" distance={18} />
              {Array.from({ length: hearts }).map((_, i) => (
                <FloatingHeart
                  key={i}
                  pointer={pointer}
                  position={[((i % 4) - 1.5) * 3.6, ((i * 2.3) % 8) - 4, -4 - (i % 3) * 1.4]}
                  scale={0.26 + (i % 3) * 0.12}
                  speed={0.22 + (i % 3) * 0.1}
                  tint={i % 2 ? "pink" : "ivory"}
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
              <Particles count={compact ? 60 : 180} color="#F5A9BE" />
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
        <h2 className="font-display text-readable text-glow text-4xl leading-tight font-medium text-foreground text-balance sm:text-6xl">
          Forever Starts Here ❤️
        </h2>
        <p className="text-readable mx-auto mt-5 max-w-md text-base font-medium text-foreground">
          Join us at {COUPLE.venue} as we begin the rest of our lives together.
        </p>
        <motion.a
          href="https://rkconventioncenter.in/"
          target="_blank"
          rel="noreferrer"
          whileHover={{ scale: 1.06, rotateX: -8, rotateY: 6 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 300, damping: 18 }}
          style={{ transformStyle: "preserve-3d", perspective: 600 }}
          className="glow-pink mt-10 inline-flex rounded-full bg-primary px-10 py-4 text-sm font-medium tracking-[0.18em] text-primary-foreground uppercase"
        >
          Celebrate With Us
        </motion.a>

        <p className="text-readable mt-16 text-xs font-semibold tracking-[0.4em] text-foreground uppercase">
          {COUPLE.names} · With love
        </p>
      </motion.div>

      <footer className="text-readable absolute inset-x-0 bottom-6 z-10 px-5 text-center text-sm font-semibold tracking-[0.28em] text-foreground uppercase sm:text-base">
        Powered by Techvaseegrah Team
      </footer>
    </section>
  );
}

export default FinalCTA;
