import { Heart3D, type Heart3DProps } from "./3d/Heart3D";

/** Reusable floating 3D heart. Must be rendered inside an R3F <Canvas>. */
export function FloatingHeart(props: Heart3DProps) {
  return <Heart3D {...props} />;
}

export default FloatingHeart;