import { Canvas } from "@react-three/fiber";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Suspense } from "react";

import templeBg from "@/assets/bgtemp.png";
import lovelyPic from "@/assets/lovelypic.png";
import { FloatingHeart } from "@/components/FloatingHeart";
import { LoveBubble } from "@/components/LoveBubble";
import { useIsCompact, useMounted, usePointerRef } from "@/hooks/usePointer";
import { Particles } from "./Particles";
import { StudioEnv } from "./StudioEnv";

/**
 * One continuous temple environment behind the whole page:
 * a parallaxed photographic backdrop plus a fixed WebGL layer of
 * hearts, glass love-bubbles, petals and pink light motes.
 */
export function TempleScene() {
  const pointer = usePointerRef();
  const compact = useIsCompact();
  const mounted = useMounted();

  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 60, damping: 22, mass: 0.4 });
  const bgY = useTransform(smooth, [0, 1], ["0%", "-2%"]);
  const bgScale = useTransform(smooth, [0, 1], [1, 1.08]);

  const hearts = compact ? 5 : 12;
  const bubbles = compact ? 3 : 7;

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[oklch(0.97_0.03_350)]">
      <motion.img
        src={templeBg}
        alt="Grand Indian temple lit warmly at twilight"
        width={537}
        height={360}
        style={{ y: bgY, scale: bgScale }}
        className="absolute inset-0 h-full w-full object-cover object-center will-change-transform"
      />
      <motion.img
        src={lovelyPic}
        alt=""
        aria-hidden="true"
        width={1536}
        height={1024}
        style={{ y: bgY, scale: bgScale }}
        className="absolute inset-0 h-full w-full object-cover object-center opacity-20 mix-blend-lighten will-change-transform"
      />
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
            <pointLight position={[-5, -2, 3]} intensity={40} color="#E88EAA" distance={20} />
            <pointLight position={[5, 3, -2]} intensity={30} color="#FFD1DE" distance={20} />

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
                tint={i % 3 === 0 ? "ivory" : "pink"}
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

            <Particles count={compact ? 70 : 220} color="#F5A9BE" size={0.07} />
            <Particles count={compact ? 40 : 120} color="#FFFFFF" size={0.1} spread={18} />
          </Suspense>
        </Canvas>
      )}
    </div>
  );
}

export default TempleScene;
