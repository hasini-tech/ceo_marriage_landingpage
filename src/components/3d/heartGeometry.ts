import * as THREE from "three";

let cached: THREE.ExtrudeGeometry | null = null;

/** A single shared, centered heart geometry (cheap to instance many times). */
export function getHeartGeometry() {
  if (cached) return cached;

  const shape = new THREE.Shape();
  shape.moveTo(0, 0.35);
  shape.bezierCurveTo(0, 0.6, -0.3, 0.9, -0.6, 0.55);
  shape.bezierCurveTo(-0.95, 0.15, -0.5, -0.3, 0, -0.75);
  shape.bezierCurveTo(0.5, -0.3, 0.95, 0.15, 0.6, 0.55);
  shape.bezierCurveTo(0.3, 0.9, 0, 0.6, 0, 0.35);

  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: 0.28,
    bevelEnabled: true,
    bevelSegments: 4,
    bevelSize: 0.08,
    bevelThickness: 0.08,
    curveSegments: 24,
  });
  geo.center();
  geo.scale(0.55, 0.55, 0.55);
  cached = geo;
  return geo;
}