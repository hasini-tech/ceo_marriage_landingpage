import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import type { Mesh } from "three";
import { getHeartGeometry } from "./heartGeometry";

export type Heart3DProps = {
  position: [number, number, number];
  scale?: number;
  speed?: number;
  tint?: "pink" | "ivory";
  /** Shared pointer ref in [-1,1] space. */
  pointer?: React.RefObject<{ x: number; y: number }>;
  /** Vertical travel range before looping back to the bottom. */
  range?: number;
};

/** A slowly rising, rotating, glowing 3D heart. */
export function Heart3D({
  position,
  scale = 1,
  speed = 0.35,
  tint = "pink",
  pointer,
  range = 9,
}: Heart3DProps) {
  const mesh = useRef<Mesh>(null);
  const geometry = useMemo(() => getHeartGeometry(), []);
  const seed = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame((state, delta) => {
    const m = mesh.current;
    if (!m) return;
    const t = state.clock.elapsedTime;

    m.position.y += delta * speed;
    if (m.position.y > position[1] + range) m.position.y = position[1] - range;

    m.rotation.y += delta * 0.5;
    m.rotation.z = Math.sin(t * 0.6 + seed) * 0.22;

    const px = pointer?.current.x ?? 0;
    const py = pointer?.current.y ?? 0;
    m.position.x += (position[0] + px * 0.7 - m.position.x) * 0.03;
    m.position.z += (position[2] + py * 0.4 - m.position.z) * 0.03;
  });

  const pink = tint === "pink";

  return (
    <mesh ref={mesh} geometry={geometry} position={position} scale={scale}>
      <meshPhysicalMaterial
        color={pink ? "#E88EAA" : "#FFF3F6"}
        emissive={pink ? "#E88EAA" : "#FFDCE6"}
        emissiveIntensity={pink ? 0.8 : 0.32}
        roughness={0.15}
        metalness={0.2}
        clearcoat={1}
        clearcoatRoughness={0.1}
        transparent
        opacity={0.9}
      />
    </mesh>
  );
}

export default Heart3D;
