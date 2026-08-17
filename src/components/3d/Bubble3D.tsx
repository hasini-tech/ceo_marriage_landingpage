import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import type { Group } from "three";
import { getHeartGeometry } from "./heartGeometry";

export type Bubble3DProps = {
  position: [number, number, number];
  radius?: number;
  speed?: number;
  /** What floats inside the glass bubble. */
  contains?: "heart" | "flower" | "memory";
  pointer?: React.RefObject<{ x: number; y: number }>;
};

function FlowerCore() {
  const petals = [0, 1, 2, 3, 4];
  return (
    <group>
      {petals.map((i) => (
        <mesh
          key={i}
          position={[
            Math.cos((i / petals.length) * Math.PI * 2) * 0.16,
            Math.sin((i / petals.length) * Math.PI * 2) * 0.16,
            0,
          ]}
        >
          <sphereGeometry args={[0.11, 12, 12]} />
          <meshStandardMaterial color="#FFFFFF" emissive="#DDFFE9" emissiveIntensity={0.35} roughness={0.4} />
        </mesh>
      ))}
      <mesh>
        <sphereGeometry args={[0.09, 12, 12]} />
        <meshStandardMaterial color="#1B9D4A" emissive="#1B9D4A" emissiveIntensity={0.9} />
      </mesh>
    </group>
  );
}

/** A transparent glass love-bubble with a small keepsake floating inside. */
export function Bubble3D({
  position,
  radius = 0.7,
  speed = 0.3,
  contains = "heart",
  pointer,
}: Bubble3DProps) {
  const group = useRef<Group>(null);
  const inner = useRef<Group>(null);
  const heart = useMemo(() => getHeartGeometry(), []);
  const seed = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame((state) => {
    const g = group.current;
    if (!g) return;
    const t = state.clock.elapsedTime * speed;

    const px = pointer?.current.x ?? 0;
    const py = pointer?.current.y ?? 0;

    g.position.x += (position[0] + Math.sin(t + seed) * 0.5 + px * 0.9 - g.position.x) * 0.04;
    g.position.y += (position[1] + Math.cos(t * 0.8 + seed) * 0.6 + py * 0.5 - g.position.y) * 0.04;
    g.rotation.y = Math.sin(t * 0.5 + seed) * 0.6;

    if (inner.current) inner.current.rotation.y += 0.01;
  });

  return (
    <group ref={group} position={position}>
      <mesh>
        <sphereGeometry args={[radius, 40, 40]} />
        <meshPhysicalMaterial
          transmission={1}
          thickness={0.6}
          roughness={0.03}
          ior={1.35}
          clearcoat={1}
          clearcoatRoughness={0}
          iridescence={0.5}
          iridescenceIOR={1.2}
          color="#EAFFF2"
          attenuationColor="#1B9D4A"
          attenuationDistance={2.4}
          transparent
          opacity={0.55}
        />
      </mesh>

      <group ref={inner} scale={radius * 0.75}>
        {contains === "heart" && (
          <mesh geometry={heart} scale={0.7}>
            <meshStandardMaterial color="#1B9D4A" emissive="#1B9D4A" emissiveIntensity={0.7} roughness={0.2} />
          </mesh>
        )}
        {contains === "flower" && <FlowerCore />}
        {contains === "memory" && (
          <mesh rotation={[0, 0, 0.2]}>
            <boxGeometry args={[0.5, 0.62, 0.03]} />
            <meshStandardMaterial color="#FFFFFF" emissive="#CFF6DE" emissiveIntensity={0.3} roughness={0.35} />
          </mesh>
        )}
      </group>
    </group>
  );
}

export default Bubble3D;