import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { PMREMGenerator } from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

/**
 * Locally generated environment map (no network fetch) so metal and glass
 * materials have something to reflect.
 */
export function StudioEnv({ intensity = 0.7 }: { intensity?: number }) {
  const { scene, gl } = useThree();

  useEffect(() => {
    const pmrem = new PMREMGenerator(gl);
    const env = pmrem.fromScene(new RoomEnvironment(), 0.04);
    scene.environment = env.texture;
    scene.environmentIntensity = intensity;
    return () => {
      env.texture.dispose();
      pmrem.dispose();
      scene.environment = null;
    };
  }, [gl, scene, intensity]);

  return null;
}

export default StudioEnv;