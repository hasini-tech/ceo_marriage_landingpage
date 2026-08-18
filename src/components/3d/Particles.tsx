import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

type ParticlesProps = { count: number; color?: string; size?: number; spread?: number };

/** Soft drifting motes of light (pink glow / white petals). */
export function Particles({ count, color = "#F5A9BE", size = 0.07, spread = 16 }: ParticlesProps) {
  const points = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * spread;
      arr[i * 3 + 1] = (Math.random() - 0.5) * spread;
      arr[i * 3 + 2] = (Math.random() - 0.5) * spread * 0.6;
    }
    return arr;
  }, [count, spread]);

  useFrame((state, delta) => {
    const p = points.current;
    if (!p) return;
    const attr = p.geometry.getAttribute("position") as THREE.BufferAttribute;
    const arr = attr.array as Float32Array;
    for (let i = 0; i < count; i++) {
      const xi = i * 3;
      const yi = xi + 1;
      arr[yi] = (arr[yi] ?? 0) + delta * (0.12 + (i % 5) * 0.04);
      arr[xi] = (arr[xi] ?? 0) + Math.sin(state.clock.elapsedTime * 0.3 + i) * delta * 0.05;
      if ((arr[yi] ?? 0) > spread / 2) arr[yi] = -spread / 2;
    }
    attr.needsUpdate = true;
    p.rotation.y = Math.sin(state.clock.elapsedTime * 0.05) * 0.1;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color={color}
        size={size}
        sizeAttenuation
        transparent
        opacity={0.75}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default Particles;
