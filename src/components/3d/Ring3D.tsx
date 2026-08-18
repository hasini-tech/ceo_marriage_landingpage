import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Group } from "three";

/** A slowly turning engagement ring with a faceted diamond. */
export function Ring3D({ pointer }: { pointer?: React.RefObject<{ x: number; y: number }> }) {
  const group = useRef<Group>(null);

  useFrame((state) => {
    const g = group.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    g.rotation.y += 0.006;
    const px = pointer?.current.x ?? 0;
    const py = pointer?.current.y ?? 0;
    g.rotation.x += (py * 0.3 - 0.55 - g.rotation.x) * 0.05;
    g.rotation.z += (px * 0.2 - g.rotation.z) * 0.05;
    g.position.y = Math.sin(t * 0.8) * 0.12;
  });

  return (
    <group ref={group}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.15, 0.13, 48, 128]} />
        <meshPhysicalMaterial
          color="#FFF6F8"
          metalness={0.25}
          roughness={0.18}
          clearcoat={1}
          clearcoatRoughness={0.05}
          emissive="#E88EAA"
          emissiveIntensity={0.35}
          envMapIntensity={2}
        />
      </mesh>

      <group position={[0, 1.28, 0]}>
        <mesh>
          <octahedronGeometry args={[0.42, 0]} />
          <meshPhysicalMaterial
            transmission={1}
            thickness={1.1}
            roughness={0}
            ior={2.4}
            iridescence={1}
            iridescenceIOR={1.6}
            clearcoat={1}
            color="#FFF3F6"
            attenuationColor="#FFD1DE"
            attenuationDistance={1.4}
          />
        </mesh>
        <mesh position={[0, -0.32, 0]} rotation={[Math.PI, 0, 0]}>
          <coneGeometry args={[0.3, 0.34, 8]} />
          <meshPhysicalMaterial
            color="#FFF6F8"
            metalness={0.25}
            roughness={0.2}
            emissive="#E88EAA"
            emissiveIntensity={0.3}
            envMapIntensity={2}
          />
        </mesh>
      </group>
    </group>
  );
}

export default Ring3D;
