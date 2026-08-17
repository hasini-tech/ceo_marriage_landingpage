import { Bubble3D, type Bubble3DProps } from "./3d/Bubble3D";

/** Reusable glass love-bubble. Must be rendered inside an R3F <Canvas>. */
export function LoveBubble(props: Bubble3DProps) {
  return <Bubble3D {...props} />;
}

export default LoveBubble;