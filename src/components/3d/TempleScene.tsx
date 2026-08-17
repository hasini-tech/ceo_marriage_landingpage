import { Canvas } from "@react-three/fiber";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Suspense } from "react";

import templeBg from "@/assets/image.png";
import { FloatingHeart } from "@/components/FloatingHeart";
import { LoveBubble } from "@/components/LoveBubble";
import { useIsCompact, useMounted, usePointerRef } from "@/hooks/usePointer";
import { Particles } from "./Particles";
import { StudioEnv } from "./StudioEnv";

/**
 * One continuous temple environment behind the whole page:
 * a parallaxed photographic backdrop plus a fixed WebGL layer of
 * hearts, glass love-bubbles, petals and green light motes.
 */
export function TempleScene() {
  const pointer = usePointerRef();
  const compact = useIsCompact();
  const mounted = useMounted();

  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 60, damping: 22, mass: 0.4 });
  const bgY = useTransform(smooth, [0, 1], ["0%", "-8%"]);
  const bgScale = useTransform(smooth, [0, 1], [1, 1.04]);
  const veil = useTransform(smooth, [0, 0.5, 1], [0.22, 0.34, 0.5]);

  const hearts = compact ? 5 : 12;
  const bubbles = compact ? 3 : 7;

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[oklch(0.08_0.025_155)]">
      <motion.img
        src={templeBg}
        alt="Grand Indian temple lit warmly at twilight"
        width={537}
        height={360}
        style={{ y: bgY, scale: bgScale }}
        className="absolute inset-0 h-full w-full object-cover object-center will-change-transform"
      />
      <motion.div
        style={{ opacity: veil }}
        className="absolute inset-0 bg-[radial-gradient(140%_95%_at_50%_18%,transparent_0%,oklch(0.1_0.03_155/0.8)_85%)]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,oklch(0.1_0.03_155/0.5)_0%,oklch(0.1_0.03_155/0.18)_35%,oklch(0.1_0.03_155/0.4)_70%,oklch(0.09_0.03_155/0.85)_100%)]" />

      {mounted && (
        <Canvas
          className="absolute inset-0"
          camera={{ position: [0, 0, 9], fov: 50 }}
          dpr={compact ? 1 : [1, 1.8]}
          gl={{ antialias: !compact, alpha: true, powerPreference: "high-performance" }}
        >
          <Suspense fallback={null}>
            <StudioEnv intensity={0.5} />
            <ambientLight intensity={0.7} />
            <directionalLight position={[4, 6, 6]} intensity={1.6} color="#FFFFFF" />
            <pointLight position={[-5, -2, 3]} intensity={40} color="#1B9D4A" distance={20} />
            <pointLight position={[5, 3, -2]} intensity={30} color="#8FF0B8" distance={20} />

            {Array.from({ length: hearts }).map((_, i) => (
              <FloatingHeart
                key={`h-${i}`}
                pointer={pointer}
                position={[
                  ((i % 5) - 2) * 3.2 + (i % 2 ? 1 : -0.8),
                  ((i * 2.7) % 9) - 4.5,
                  -4 - (i % 4) * 1.6,
                ]}
                scale={0.3 + (i % 3) * 0.12}
                speed={0.18 + (i % 4) * 0.08}
                tint={i % 3 === 0 ? "ivory" : "emerald"}
              />
            ))}

            {Array.from({ length: bubbles }).map((_, i) => (
              <LoveBubble
                key={`b-${i}`}
                pointer={pointer}
                position={[((i % 4) - 1.5) * 4.2, ((i * 3.1) % 7) - 3.5, -6 - (i % 3) * 2]}
                radius={0.4 + (i % 3) * 0.22}
                speed={0.18 + (i % 3) * 0.1}
                contains={i % 3 === 0 ? "heart" : i % 3 === 1 ? "flower" : "memory"}
              />
            ))}

            <Particles count={compact ? 70 : 220} color="#7BE8A6" size={0.07} />
            <Particles count={compact ? 40 : 120} color="#FFFFFF" size={0.1} spread={18} />
          </Suspense>
        </Canvas>
      )}
    </div>
  );
}

export default TempleScene;
